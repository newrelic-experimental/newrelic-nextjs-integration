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

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  if (typeof window == "undefined") {
    const newrelic = require("newrelic");
    newrelic.noticeError(err);
  } else {
    window.newrelic.noticeError(err);
  }

  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
