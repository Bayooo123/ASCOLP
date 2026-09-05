import AdminLayout from "../../../components/AdminLayout";
import TeamMemberForm from "../../../components/admin/TeamMemberForm";
import { getSessionFromReq } from "../../../lib/auth";
import { prisma } from "../../../lib/prisma";

export async function getServerSideProps({ req, params }) {
  const session = getSessionFromReq(req);
  if (!session) return { redirect: { destination: "/admin/login", permanent: false } };

  const isAdmin = session.role === "ADMIN";
  const isSelf = session.teamMemberId === params.id;
  if (!isAdmin && !isSelf) return { redirect: { destination: "/admin", permanent: false } };

  const member = await prisma.teamMember.findUnique({
    where: { id: params.id },
    include: { dealHistory: { orderBy: { order: "asc" } } },
  });
  if (!member) return { notFound: true };

  return { props: { member: JSON.parse(JSON.stringify(member)), isAdmin } };
}

export default function EditTeamMember({ member, isAdmin }) {
  return (
    <AdminLayout title={`Edit: ${member.name}`}>
      <TeamMemberForm isAdmin={isAdmin} member={member} />
    </AdminLayout>
  );
}
