import { type AppType } from "next/app";
import Head from "next/head";

import { api } from "~/utils/api";
import { ClerkProvider } from "@clerk/nextjs";

import "~/styles/globals.css";
import HotToast from "~/components/HotToast";
import { PagesProgressBar as ProgressBar } from "next-nprogress-bar";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps}>
      <Head>
        <title>Emotter T3 Stack App</title>
        <meta name="description" content="💭" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HotToast />
      <Component {...pageProps} />
      <ProgressBar
        height="4px"
        color="#fff"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
