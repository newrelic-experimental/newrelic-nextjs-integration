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
  // const data = blogHandler();
  const data = await fetch('http://localhost:3000/api/blog');
  const postsData = await data.json();
  console.log('data', postsData);

  const posts = await Promise.resolve([
    { id: 1, title: "Post 1" },
    { id: 2, title: "Post 2" },
  ]);

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts,
    },
  };
}

export default Blog;
