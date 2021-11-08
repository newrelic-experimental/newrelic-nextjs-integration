This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Newrelic NextJs Integration

### New Relic Browser Agent Integration

1. Log in to your New Relic account (if you don't have it yet, register for free [here](https://newrelic.com/signup))
2. Go to [https://one.newrelic.com](https://one.newrelic.com) and (in the top right corner) select *Add more data*
3. Select *New Relic Browser* from *Browser metrics*
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
