import Link from "next/link";
import { logger } from "../../components/Logger";
import Layout from "../../components/Layout";
import * as http from "http";

function Post({ post }) {
  return (
    <Layout>
      <p>
        <Link href="/blog">
          Return to Blog
        </Link>
      </p>
      <h3>{post.title}</h3>
      <p>{post.description}</p>
    </Layout>
  );
}

export async function getServerSideProps({ params, req }) {
  const { id } = params;
  const host = req.headers.host;
  // Call an external API endpoint to get posts
  // this is calling /api/blog handler function
  // using http because NR agent cannot propagate through global fetch just yet
  const posts: Array<{ id; title }> = await new Promise((resolve, reject) => {
    http
      .get(`http://${host}/api/blog`, (res) => {
        let body = "";
        res.on("data", (data) => (body += data.toString("utf8")));
        res.on("end", () => {
          resolve(JSON.parse(body));
        });
      })
      .on("error", reject);
  });

  logger.info("Getting post id", { postId: id });
  const [post] = posts.filter((p) => p.id === parseInt(id, 10));

  return {
    props: {
      post,
    },
  };
}

export default Post;
