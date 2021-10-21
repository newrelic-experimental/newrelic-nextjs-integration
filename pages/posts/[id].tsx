function Post({ post }) {
  return (
    <>
      <h3>{post.title}</h3>
      <p>{post.description}</p>
    </>
  );
}

// This function gets called at build time
export async function getStaticPaths(args) {
  // Call an external API endpoint to get posts
  const data = await fetch('http://localhost:3000/api/blog');
  const posts = await data.json();

  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post) => ({
    params: { id: post.id.toString() },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  const getPostDetails = (id) => {
    const posts = {
      1: {
        title: "Post 1",
        description: "My brilliant post 1",
      },
      2: {
        title: "Post 2",
        description: "My brilliant post 2",
      },
      3: {
        title: "Post 3",
        description: "My brilliant post 3",
      },
      4: {
        title: "Post 4",
        description: "My brilliant post 4",
      },
    };
    return posts[id];
  };
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const post = await Promise.resolve(getPostDetails(params.id));

  // Pass post data to the page via props
  return { props: { post } };
}

export default Post;
