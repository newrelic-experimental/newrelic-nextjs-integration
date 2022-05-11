function Error({ statusCode, err }) {
  return (
    <p>
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : "An error occurred on client" }
    </p>
  );
}

Error.getInitialProps = ({ res, err }) => {
  // @ts-ignore
  window.newrelic.noticeError(err)

  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
