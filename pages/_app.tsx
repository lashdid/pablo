import { AppProps } from 'next/app';
import Head from 'next/head';
import { Global, MantineProvider } from '@mantine/core';
import Layout from '../layout/Layout';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>PABLO</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: 'dark',
        }}
      >
        <Layout title="PABLO">
          <Component {...pageProps} />
        </Layout>
      </MantineProvider>
    </>
  );
}