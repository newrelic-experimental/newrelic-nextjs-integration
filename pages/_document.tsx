const newrelic = require("newrelic");
import Document, {
  DocumentContext,
  DocumentInitialProps,
  Html,
  Head,
  Main,
  NextScript,
} from "next/document";

import { logger } from "../components/Logger";

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);

    const browserTimingHeader = newrelic.getBrowserTimingHeader({
      hasToRemoveScriptWrapper: true,
    });

    logger.info("NextJs New Relic redirecting to a page", {
      application: "NextJs NewRelic app logging",
      test: "Testing logging with Winston",
      pathname: ctx.pathname,
    });

    return {
      ...initialProps,
      // @ts-ignore
      browserTimingHeader,
    };
  }

  render() {
    return (
      <Html>
        <Head>
          <script
            type="text/javascript"
            // @ts-ignore
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
