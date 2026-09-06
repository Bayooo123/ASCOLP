import AdminLayout from "../../../components/AdminLayout";
import AlumniForm from "../../../components/admin/AlumniForm";
import { getSessionFromReq } from "../../../lib/auth";

export async function getServerSideProps({ req }) {
  const session = getSessionFromReq(req);
  if (!session) return { redirect: { destination: "/admin/login", permanent: false } };
  if (session.role !== "ADMIN") return { redirect: { destination: "/admin", permanent: false } };
  return { props: {} };
}

export default function NewAlumnus() {
  return (
    <AdminLayout title="Add Alumnus">
      <AlumniForm isNew alumnus={{}} />
    </AdminLayout>
  );
}
