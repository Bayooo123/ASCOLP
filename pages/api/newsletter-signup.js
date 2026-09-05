import { upsertOne } from "../../lib/db";

// The footer's newsletter form is a plain HTML form (no JS) so it keeps
// working even on pages that don't hydrate it — this redirects back to
// wherever the visitor submitted from, with a query flag the page can
// use to show a thank-you state if it wants to.
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const email = (req.body?.email || "").trim();
  const back = req.headers.referer || "/";
  const redirectUrl = new URL(back, `http://${req.headers.host}`);

  if (email) {
    const { error } = await upsertOne("newsletterSubscribers", "email", email, {});
    redirectUrl.searchParams.set("subscribed", error ? "0" : "1");
  } else {
    redirectUrl.searchParams.set("subscribed", "0");
  }

  res.writeHead(303, { Location: redirectUrl.pathname + redirectUrl.search });
  res.end();
}
