import AdminLayout from "../../components/AdminLayout";
import { getSessionFromReq } from "../../lib/auth";

export async function getServerSideProps({ req }) {
  const session = getSessionFromReq(req);
  if (!session) {
    return { redirect: { destination: "/admin/login", permanent: false } };
  }
  if (session.role === "TEAM_MEMBER" && session.teamMemberId) {
    return { redirect: { destination: `/admin/team/${session.teamMemberId}`, permanent: false } };
  }
  return { props: { email: session.email } };
}

export default function AdminDashboard({ email }) {
  return (
    <AdminLayout title="Dashboard">
      <p>Signed in as {email}.</p>
      <ul style={{ marginTop: "24px", lineHeight: 2 }}>
        <li>
          <a href="/admin/team">Manage Team Profiles</a>
        </li>
        <li>
          <a href="/admin/alumni">Manage Alumni</a>
        </li>
        <li>
          <a href="/admin/articles">Manage Articles &amp; Newsletters</a>
        </li>
      </ul>
    </AdminLayout>
  );
}
