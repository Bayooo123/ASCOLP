import Head from "next/head";

const SITE_NAME = "ASCOLP";
const DEFAULT_DESCRIPTION = "Abiola Sanni & Co. (ASCOLP) — Taxation, Litigation and Corporate Law Firm in Lagos, Nigeria.";
const DEFAULT_IMAGE = "/assets/images/logo/logo.png";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://ascolp.com";

export default function Seo({ title, description = DEFAULT_DESCRIPTION, path = "", image = DEFAULT_IMAGE }) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Taxation, Litigation & Corporate Law Firm`;
  const url = `${SITE_URL}${path}`;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={`${SITE_URL}${image}`} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${SITE_URL}${image}`} />
    </Head>
  );
}
