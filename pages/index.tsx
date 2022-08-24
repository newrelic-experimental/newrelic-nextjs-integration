import type { NextPage } from "next";
import Link from "next/link";

import Layout from "../components/Layout";

const Home: NextPage = () => {
  return (
    <Layout>
      <p>
        <Link href="/">
          <a>Home</a>
        </Link>
      </p>

      <p>
        <Link href="/blog">
          <a>Blog</a>
        </Link>
      </p>

      <p>
        <Link href="/about">
          <a>About</a>
        </Link>
      </p>
    </Layout>
  );
};

export default Home;
