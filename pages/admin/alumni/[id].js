import AdminLayout from "../../../components/AdminLayout";
import AlumniForm from "../../../components/admin/AlumniForm";
import { getSessionFromReq } from "../../../lib/auth";
import { prisma } from "../../../lib/prisma";

export async function getServerSideProps({ req, params }) {
  const session = getSessionFromReq(req);
  if (!session) return { redirect: { destination: "/admin/login", permanent: false } };
  if (session.role !== "ADMIN") return { redirect: { destination: "/admin", permanent: false } };

  const alumnus = await prisma.alumni.findUnique({ where: { id: params.id } });
  if (!alumnus) return { notFound: true };

  return { props: { alumnus: JSON.parse(JSON.stringify(alumnus)) } };
}

export default function EditAlumnus({ alumnus }) {
  return (
    <AdminLayout title={`Edit: ${alumnus.name}`}>
      <AlumniForm alumnus={alumnus} />
    </AdminLayout>
  );
}
