import AdminLayout from "../../../components/AdminLayout";
import TeamMemberForm from "../../../components/admin/TeamMemberForm";
import { getSessionFromReq } from "../../../lib/auth";
import { db } from "../../../lib/db";

export async function getServerSideProps({ req, params }) {
  const session = getSessionFromReq(req);
  if (!session) return { redirect: { destination: "/admin/login", permanent: false } };

  const isAdmin = session.role === "ADMIN";
  const isSelf = session.teamMemberId === params.id;
  if (!isAdmin && !isSelf) return { redirect: { destination: "/admin", permanent: false } };

  const { data: member } = await db("teamMembers").select("*").eq("id", params.id).maybeSingle();
  if (!member) return { notFound: true };

  const { data: dealHistory } = await db("dealRecords").select("*").eq("teamMemberId", params.id).order("sortOrder");

  return { props: { member: { ...member, dealHistory: dealHistory || [] }, isAdmin } };
}

export default function EditTeamMember({ member, isAdmin }) {
  return (
    <AdminLayout title={`Edit: ${member.name}`}>
      <TeamMemberForm isAdmin={isAdmin} member={member} />
    </AdminLayout>
  );
}
