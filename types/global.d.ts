import type newrelic from "newrelic";

interface Newrelic extends newrelic {
  noticeError(
    error: (Error & { statusCode?: number | undefined }) | null | undefined
  ): void;
  addPageAction: (actionName: string, customAttributes?: object) => void;
  setCustomAttribute: (key: string, value: string | number) => void;
  // add more methods here if you need them
  // https://docs.newrelic.com/docs/browser/new-relic-browser/browser-apis/using-browser-apis/
}

// for the New Relic browser agent
declare global {
  interface Window {
    newrelic: Newrelic;
  }
}
