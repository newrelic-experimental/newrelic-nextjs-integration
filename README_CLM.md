# Next.js Example app to test CodeStream code level metrics

This document describes how to setup and run the Next.js to test [CodeStream code level metrics](https://newrelic.com/blog/nerdlog/codestream-code-level-metrics).

## Setup

 1. `cp sample.env .env`
 1. Fill out `NEW_RELIC_LICENSE_KEY` with your ingest license key.
 1. `docker-compose up -d --build`
 1. Visit [New Relic One](https:/one.newrelic.com) > APM & services > select `nextjs-code-level-metrics-demo` > Distributed Tracing. 
 1. Click the `WebTransaction/WebFrameworkUri/Nextjs/GET//blog` trace group and open a Trace.
 1. Click Expand All.
 1. Click the `Nodejs/Middleware/Nextjs//middleware`, `Nodejs/Nextjs/getServerSideProps//blog`, or `Nextjs/GET//api/blog` spans and select attributes.(You should see the relevant code.function and code.filepath attributes)
