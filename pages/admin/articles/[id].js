import AdminLayout from "../../../components/AdminLayout";
import ArticleForm from "../../../components/admin/ArticleForm";
import { getSessionFromReq } from "../../../lib/auth";
import { prisma } from "../../../lib/prisma";

export async function getServerSideProps({ req, params }) {
  const session = getSessionFromReq(req);
  if (!session) return { redirect: { destination: "/admin/login", permanent: false } };
  if (session.role !== "ADMIN") return { redirect: { destination: "/admin", permanent: false } };

  const article = await prisma.article.findUnique({ where: { id: params.id } });
  if (!article) return { notFound: true };

  return { props: { article: JSON.parse(JSON.stringify(article)) } };
}

export default function EditArticle({ article }) {
  return (
    <AdminLayout title={`Edit: ${article.title}`}>
      <ArticleForm article={article} />
    </AdminLayout>
  );
}
