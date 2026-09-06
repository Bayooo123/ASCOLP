import AdminLayout from "../../../components/AdminLayout";
import TeamMemberForm from "../../../components/admin/TeamMemberForm";
import { getSessionFromReq } from "../../../lib/auth";

export async function getServerSideProps({ req }) {
  const session = getSessionFromReq(req);
  if (!session) return { redirect: { destination: "/admin/login", permanent: false } };
  if (session.role !== "ADMIN") return { redirect: { destination: "/admin", permanent: false } };
  return { props: {} };
}

export default function NewTeamMember() {
  return (
    <AdminLayout title="Add Team Member">
      <TeamMemberForm isAdmin isNew member={{}} />
    </AdminLayout>
  );
}
