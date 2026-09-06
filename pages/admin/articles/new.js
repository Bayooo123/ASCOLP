import AdminLayout from "../../../components/AdminLayout";
import ArticleForm from "../../../components/admin/ArticleForm";
import { getSessionFromReq } from "../../../lib/auth";

export async function getServerSideProps({ req }) {
  const session = getSessionFromReq(req);
  if (!session) return { redirect: { destination: "/admin/login", permanent: false } };
  if (session.role !== "ADMIN") return { redirect: { destination: "/admin", permanent: false } };
  return { props: {} };
}

export default function NewArticle() {
  return (
    <AdminLayout title="Add Article / Newsletter">
      <ArticleForm isNew article={{}} />
    </AdminLayout>
  );
}
