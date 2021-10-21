import { newrelicAgentSnippet } from "../newrelic/newrelic-browser-agent";

export const NewRelicSnippet = () => {
  return (
    <script
      type="text/javascript"
      dangerouslySetInnerHTML={{ __html: newrelicAgentSnippet }}
    />
  );
};
