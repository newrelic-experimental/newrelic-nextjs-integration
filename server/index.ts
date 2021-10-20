import {NextFunction, Request, Response} from "express";
import express from "express"
import next from "next";

// @ts-ignore
const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  server.use((req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    req.newrelic = {
      name: 'newrelic'
    }
    next();
  })

  server.all('*', (req: Request, res:Response) => {
    return handle(req, res)
  })

  // @ts-ignore
  server.listen(port, (err: any) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})