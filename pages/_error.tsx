import { NextPage, NextPageContext } from "next";

type Props = {
  statusCode: number | undefined;
};

const Error: NextPage<Props> = ({ statusCode }) => {
  return (
    <p>
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : "An error occurred on client"}
    </p>
  );
};

Error.getInitialProps = async ({ res, err }: NextPageContext) => {
  if (typeof window == "undefined") {
    // use dynamic import to avoid typescript error
    // https://2ality.com/2017/01/import-operator.html
    const newrelic = await import("newrelic");
    newrelic.noticeError(err);
  } else {
    window.newrelic.noticeError(err);
  }

  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
