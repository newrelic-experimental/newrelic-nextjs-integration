import newrelic from "newrelic";
import { NextFunction, Request, Response } from "express";
import express from "express";
import next from "next";
import { parse } from "url";

// @ts-ignore
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use((req: Request, res: Response, next: NextFunction) => {
    // Add NewRelic to req object so we can utilize it
    // in nextjs/express handlers
    // @ts-ignore
    req.newrelic = newrelic;
    next();
  });

  server.get("*", (req: Request, res: Response) => {
    // parse req url
    // and pass it to NewRelic transaction name
    const parsedUrl = parse(req.url, true);
    const { pathname } = parsedUrl; // you can also get other params like "query" object

    // Transaction Name: (w/o this new relic shows "/*" for all transaction)
    // https://docs.newrelic.com/docs/agents/nodejs-agent/api-guides/guide-using-nodejs-agent-api
    // console.log(`path ${pathname}`);
    newrelic.setTransactionName(pathname);

    return handle(req, res);
  });

  server.all("*", (req: Request, res: Response) => {
    return handle(req, res);
  });

  // @ts-ignore
  server.listen(port, (err: any) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
