import AdminLayout from "../../../components/AdminLayout";
import ArticleForm from "../../../components/admin/ArticleForm";
import { getSessionFromReq } from "../../../lib/auth";
import { db } from "../../../lib/db";

export async function getServerSideProps({ req, params }) {
  const session = getSessionFromReq(req);
  if (!session) return { redirect: { destination: "/admin/login", permanent: false } };
  if (session.role !== "ADMIN") return { redirect: { destination: "/admin", permanent: false } };

  const { data: article } = await db("articles").select("*").eq("id", params.id).maybeSingle();
  if (!article) return { notFound: true };

  return { props: { article } };
}

export default function EditArticle({ article }) {
  return (
    <AdminLayout title={`Edit: ${article.title}`}>
      <ArticleForm article={article} />
    </AdminLayout>
  );
}
