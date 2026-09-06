function camelToSnake(str) {
  return str.replace(/[A-Z]/g, (m) => `_${m.toLowerCase()}`);
}

function snakeToCamel(str) {
  return str.replace(/_([a-z0-9])/g, (_, c) => c.toUpperCase());
}

export function toSnakeCaseObj(obj) {
  if (obj == null || typeof obj !== "object") return obj;
  if (Array.isArray(obj)) return obj.map(toSnakeCaseObj);
  const out = {};
  for (const [k, v] of Object.entries(obj)) out[camelToSnake(k)] = v;
  return out;
}

export function toCamelCaseObj(obj) {
  if (obj == null || typeof obj !== "object") return obj;
  if (Array.isArray(obj)) return obj.map(toCamelCaseObj);
  const out = {};
  for (const [k, v] of Object.entries(obj)) out[snakeToCamel(k)] = v;
  return out;
}

export { camelToSnake, snakeToCamel };
