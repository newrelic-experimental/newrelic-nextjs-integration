import Link from "next/link";

import Layout from "../components/Layout";
import * as http from 'http';

function Blog({ posts, test }) {
  return (
    <Layout>
      <p>
        <Link href="/">
          <a>Home</a>
        </Link>
      </p>
      <div>{test}</div>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`} as={`/posts/${post.id}`}>
              <a>{post.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const host = req.headers.host
  // Call an external API endpoint to get posts
  // this is calling /api/blog handler function
  // using http because NR agent cannot propagate through global fetch just yet
  const posts: Array<{ id, title }> = await new Promise((resolve, reject) => {
    http.get(`http://${host}/api/blog`, (res) => {
      let body = ''
      res.on('data', (data) => (body += data.toString(('utf8'))))
      res.on('end', () => {
        resolve(JSON.parse(body))
      })
    }).on('error', reject)
  });

  return {
    props: {
      posts,
    },
  };
}

export default Blog;
