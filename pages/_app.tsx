import "../styles/globals.css";
import { AppProps } from "next/app";
import Head from "next/head";

// import { NewRelicSnippet } from "../components/NewRelicSnippet";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>NewRelic NextJs Integration</title>
        <link rel="shortcut icon" href="/public/favicon.ico" />
        {/* <NewRelicSnippet /> */}
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
