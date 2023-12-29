import Head from 'next/head'
import { Router, useRouter } from 'next/router'
import { MDXProvider } from '@mdx-js/react'
import { useEffect } from 'react';
import { Layout } from '@/components/Layout'
import * as mdxComponents from '@/components/mdx'
import { useMobileNavigationStore } from '@/components/MobileNavigation'
import { checkForToken } from '@/helpers/checkForToken';
import '@/styles/tailwind.css'
import 'focus-visible'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import styles from '../styles/style.css';
import { fetchLogs } from '@/helpers/fetchLogs'
import { fetchElements } from '@/helpers/fetchElements'
import { downloadChatLogs } from '@/helpers/downloadChatLogs'
import { handleUserSession } from '@/helpers/handleUserSessions'
import store from "../stores/store";





function onRouteChange() {
  useMobileNavigationStore.getState().close()
}

Router.events.on('hashChangeStart', onRouteChange)
Router.events.on('routeChangeComplete', onRouteChange)
Router.events.on('routeChangeError', onRouteChange)

export default function App({ Component, pageProps }) {
  let router = useRouter();
  const { mainStore } = store;
  const { setTokenMessage,openTokenModal,setOpenTokenModal,currentSession, setUserToken,setCurrentSession, setChatLogs, setOriginalData, setFilteredData, questionnaireElements, setTokenMessageCount,setTokenValidTo } = mainStore();

  useEffect(() => {


    const initialize = async () => {
      handleUserSession(setCurrentSession);
      checkForToken(setTokenMessage,setUserToken,setTokenMessageCount,setTokenValidTo,setOpenTokenModal );
      const logs = await fetchLogs(setChatLogs);
      await fetchElements(1, 5, setOriginalData, setFilteredData, questionnaireElements);
      //await downloadChatLogs(logs);
    };


    initialize();
  }, []);


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
