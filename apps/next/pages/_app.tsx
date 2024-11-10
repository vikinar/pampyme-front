import { Provider } from 'app/provider'
import Head from 'next/head'
import 'raf/polyfill'
// import React from 'react'
import 'setimmediate'
import type { SolitoAppProps } from 'solito'

import '../globals.css'

function MyApp({ Component, pageProps }: SolitoAppProps) {
  return (
    <>
      <Head>
        <title>Solito Example App</title>
        <meta
          name="description"
          content="Expo + Next.js with Solito. By Fernando Rojo."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Provider>
        <Component {...pageProps} />
      </Provider>
    </>
  )
}

export default MyApp
