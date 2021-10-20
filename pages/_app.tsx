import '../styles/globals.css'
import App, { AppProps, AppContext } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext)
  const req = appContext.ctx.req

  const isServer = typeof window === 'undefined';
  if(isServer) {
    console.log('server', req.newrelic)
  } else {
    console.log('client', req.newrelic)
  }

  return {
    pageProps: {
      ...appProps.pageProps,
      // user: req?.user,
    },
  }
}

export default MyApp
