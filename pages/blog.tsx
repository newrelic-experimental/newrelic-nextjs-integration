import Link from "next/link";

import blogHandler from './api/blog';

function Blog({ posts, test }) {
  return (
    <>
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
    </>
  );
}

// This function gets called at build time
export async function getStaticProps(args) {
  // Call an external API endpoint to get posts
  // this is calling /api/blog handler function
  const data = await fetch('http://localhost:3000/api/blog');
  const posts = await data.json();

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts,
    },
  };
}

export default Blog;
