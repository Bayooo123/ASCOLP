import AdminLayout from "../../../components/AdminLayout";
import AlumniForm from "../../../components/admin/AlumniForm";
import { getSessionFromReq } from "../../../lib/auth";
import { db } from "../../../lib/db";

export async function getServerSideProps({ req, params }) {
  const session = getSessionFromReq(req);
  if (!session) return { redirect: { destination: "/admin/login", permanent: false } };
  if (session.role !== "ADMIN") return { redirect: { destination: "/admin", permanent: false } };

  const { data: alumnus } = await db("alumni").select("*").eq("id", params.id).maybeSingle();
  if (!alumnus) return { notFound: true };

  return { props: { alumnus } };
}

export default function EditAlumnus({ alumnus }) {
  return (
    <AdminLayout title={`Edit: ${alumnus.name}`}>
      <AlumniForm alumnus={alumnus} />
    </AdminLayout>
  );
}
