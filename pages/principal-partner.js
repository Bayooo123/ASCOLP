// The Principal Partner's bio now lives on the Team page (single source of
// truth, editable from the admin panel), so this legacy nav link redirects
// there instead of maintaining a second copy of the same content.
export async function getServerSideProps() {
  return { redirect: { destination: "/team/abiola-sanni", permanent: true } };
}

export default function PrincipalPartnerRedirect() {
  return null;
}
