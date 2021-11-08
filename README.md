This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Newrelic NextJs Integration

### New Relic Browser Agent Integration

1. Log in to your New Relic account (if you don't have it yet, register for free [here](https://newrelic.com/signup))
2. Go to [https://one.newrelic.com](https://one.newrelic.com) and (in the top right corner) select *Add more data*
3. Select *New Relic Browser* from *Browser metrics* section
4. Tick *Copy/Paste Javascript code*, enter your app name, and click *Enable*
5. You should now have the New Relic Browser snippet available to you which should look something like this:
   <img width="909" alt="Screenshot 2021-11-08 at 14 45 37" src="https://user-images.githubusercontent.com/6328360/140762690-67fba0a9-6a9d-4959-9516-75fef61ed3e8.png">
6. Copy/paste the entire snippet to a `.js` file in your project (you can find the example in this repo under `/newrelic/newrelic-browser-agent.js` - see [here](newrelic-nextjs-integration/blob/main/newrelic/newrelic-browser-agent.js))
7. **Important** - modify the script:
   1. remove `<script>` tags from the beginning and the end of the script
   2. replace all "\\" with "\\\\" - escape the escape character (credit to @petvas)
8. Create a new React Component and import the New Relic Browser agent to the file
   1. see the example [here](newrelic-nextjs-integration/blob/main/components/NewRelicSnippet.tsx) - you can simply copy/paste it (remember to change the path to your New Relic Browser agent script if it differs)
9. Add the newly created component (in this case `NewRelicSnippet`) to the `Head` of your app entry point, usually `_app.tsx` under `pages` directory
   1. see how to do it [here](https://github.com/matewilk/newrelic-nextjs-integration/blob/main/pages/_app.tsx#L12)
10. Congratulations, you have now successfully integrated New Relic Browser agent with NextJs framework!

### New Relic APM (Node.js) Agent Integration

1. Log in to your New Relic account (if you don't have it yet, register for free [here](https://newrelic.com/signup))
2. Go to [https://one.newrelic.com](https://one.newrelic.com) and (in the top right corner) select *Add more data*
3. Select *Node JS* from *App monitoring* section
4. Click *Begin installation*
5. In the bottom right corner click *Node standard installation*
6. Follow the instructions:
   1. Give your app a name
   2. Install the agent `npm install newrelic --save`
   3. Download your custom configuration file
      1. **Important** - and save it in your app **root** directory as `newrelic.js`
      2. make sure the `license_key` property inside the file contains your license key value
   4. Add New Relic to your application's main module (NodeJs app entry point - usually `index.ts/js` - example [here](newrelic-nextjs-integration/blob/main/server/index.ts#L1))
      1. **Important** - import/require as a named import (you will need it later)
         1. `const newrelic = require('newrelic')` or
         2. `import newrelic from 'newrelic'`
   5. Add middleware to attach `newrelic` to the `req` object (we'll need it to send custom attributes to New Relic - see point 7)
      1. see the example [here](newrelic-nextjs-integration/blob/main/server/index.ts#L16)
   6. Add middleware to `setTransactionName` for the New Relic's Distributed Tracing functionality
      1. follow the example from [here](newrelic-nextjs-integration/blob/main/server/index.ts#L24) - lines `24 - 36` (for basic Distributed Tracing integration)
      2. for more comprehensive Distributed Tracing integration see [this](https://github.com/newrelic-experimental/node-newrelic-nextjs) repo
         1. specifically you might want to use [this](https://github.com/newrelic-experimental/node-newrelic-nextjs/blob/main/lib/instrumentation/next/next-server.js) example to instrument with various NextJs handlers
   7. Custom Attributes instrumentation
      1. Under `/pages/api` directory NextJs keeps all the API handlers for various pages
      2. To send custom attributes to NR simply use the `req.newrelic` reference (added in point 5)
         1. `req.newrelic` is a `newrelic` instance that has access to all the methods
         2. in this case use `addCustomAttributes` method to send them to New Relic
         3. see the [example](newrelic-nextjs-integration/blob/main/pages/api/blog.ts#L14) under `/pages/api/blog.ts`
   8. Congratulations, you have now successfully integrated New Relic (Node.js) Agent with your NextJs app.