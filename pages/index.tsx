import Link from "next/link";

import Layout from "../components/Layout";
const LINKS = [
  {
    name: "Home",
    href: "/"
  },
  {
    name: "Blog",
    href: "/blog"
  },
  {
    name: "About",
    href: "/about"
  }
];

function Home({ links }) { 
  return (
    <Layout>
      {links.map((link) => (
        <p key={link.name}>
          <Link href={link.href}>
            {link.name}
          </Link>
        </p>
      ))}
    </Layout>
  );
};

export async function getStaticProps() {
  return { 
    props: {
      links: LINKS
    }
  }
};

export default Home;
