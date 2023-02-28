import newrelic from "newrelic";
import Document, {
  DocumentContext,
  DocumentInitialProps,
  Html,
  Head,
  Main,
  NextScript,
} from "next/document";

import { logger } from "../components/Logger";

type NewRelicProps = {
  browserTimingHeader: string;
};

class MyDocument extends Document<NewRelicProps> {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps & NewRelicProps> {
    const initialProps = await Document.getInitialProps(ctx);

    /**
     * For SSG pages the build is faster than the agent connect cycle
     * In those cases, let's wait for the agent to connect before getting
     * the browser agent script.
     */
    if (!newrelic.agent.collector.isConnected()) {
      await new Promise((resolve) => {
        newrelic.agent.on("connected", resolve);
      });
    }

    const browserTimingHeader = newrelic.getBrowserTimingHeader({
      hasToRemoveScriptWrapper: true,
      allowTransactionlessInjection: true,
    });

    logger.info("NextJs New Relic redirecting to a page", {
      application: "NextJs NewRelic app logging",
      test: "Testing logging with Winston",
      pathname: ctx.pathname,
    });

    return {
      ...initialProps,
      browserTimingHeader,
    };
  }

  render() {
    return (
      <Html>
        <Head>
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{ __html: this.props.browserTimingHeader }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
