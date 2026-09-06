import { createClient } from "@naijabase/js";
import { toSnakeCaseObj, toCamelCaseObj, camelToSnake } from "./caseMap";

// createClient() itself throws if given undefined (it calls .replace() on the
// URL unconditionally), which would crash the whole build/boot at import time
// whenever these env vars aren't set yet — fall back to placeholders so that
// only actual requests fail (gracefully, as {data: null, error}), not startup.
if (!process.env.NAIJABASE_URL || !process.env.NAIJABASE_ANON_KEY) {
  console.error("NAIJABASE_URL / NAIJABASE_ANON_KEY are not set — all database reads/writes will fail.");
}

const client = createClient(
  process.env.NAIJABASE_URL || "https://api.naijabase.dev/projects/unconfigured",
  process.env.NAIJABASE_ANON_KEY || "unconfigured"
);

// The real @naijabase/js client works in snake_case (it's a thin REST client
// over Postgres). This wrapper lets the rest of the app keep using camelCase
// field names — same shape the code had under Prisma — by translating column
// names going in and row keys coming back out.
class CamelQueryBuilder {
  constructor(qb) {
    this._qb = qb;
  }

  select(columns = "*") {
    this._qb.select(columns);
    return this;
  }

  insert(data) {
    this._qb.insert(toSnakeCaseObj(data));
    return this;
  }

  update(data) {
    this._qb.update(toSnakeCaseObj(data));
    return this;
  }

  delete() {
    this._qb.delete();
    return this;
  }

  eq(col, val) {
    this._qb.eq(camelToSnake(col), val);
    return this;
  }

  neq(col, val) {
    this._qb.neq(camelToSnake(col), val);
    return this;
  }

  in(col, vals) {
    this._qb.in(camelToSnake(col), vals);
    return this;
  }

  ilike(col, pattern) {
    this._qb.ilike(camelToSnake(col), pattern);
    return this;
  }

  order(col, options) {
    this._qb.order(camelToSnake(col), options);
    return this;
  }

  limit(n) {
    this._qb.limit(n);
    return this;
  }

  async single() {
    const { data, error } = await this._qb.single();
    return { data: toCamelCaseObj(data), error };
  }

  async maybeSingle() {
    const { data, error } = await this._qb.maybeSingle();
    return { data: toCamelCaseObj(data), error };
  }

  then(onFulfilled, onRejected) {
    return this._qb.then(({ data, error }) => ({ data: toCamelCaseObj(data), error })).then(onFulfilled, onRejected);
  }
}

export function db(table) {
  return new CamelQueryBuilder(client.from(camelToSnake(table)));
}

// No native upsert in the SDK — match on a unique column, then insert or update.
export async function upsertOne(table, matchColumn, matchValue, data) {
  const { data: existing } = await db(table).select("id").eq(matchColumn, matchValue).maybeSingle();
  if (existing) {
    return db(table).update(data).eq(matchColumn, matchValue).select().single();
  }
  return db(table)
    .insert({ ...data, [matchColumn]: matchValue })
    .select()
    .single();
}

export const naijabase = client;
