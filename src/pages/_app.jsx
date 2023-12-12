import Head from 'next/head'
import { Router, useRouter } from 'next/router'
import { MDXProvider } from '@mdx-js/react'

import { Layout } from '@/components/Layout'
import * as mdxComponents from '@/components/mdx'
import { useMobileNavigationStore } from '@/components/MobileNavigation'

import '@/styles/tailwind.css'
import 'focus-visible'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import styles from '../styles/style.css';
 



function onRouteChange() {
  useMobileNavigationStore.getState().close()
}

Router.events.on('hashChangeStart', onRouteChange)
Router.events.on('routeChangeComplete', onRouteChange)
Router.events.on('routeChangeError', onRouteChange)

export default function App({ Component, pageProps }) {
  let router = useRouter()

  return (
    <>
      <Head>
    
        {router.pathname === '/' ? (
          <title>IntelSurv - An Intelligent Disease Survellance Feedback System</title>
        ) : (
          <title>IntelSurv - An Intelligent Disease Survellance Feedback System</title>
        )}
        <meta name="description" content={pageProps.description} />

      </Head>
      <MDXProvider components={mdxComponents}>
        <Layout {...pageProps}>
          <Component {...pageProps} />
          </Layout>
          <ToastContainer position="top-center" autoClose={5000} />

      </MDXProvider>
    </>
  )
}
