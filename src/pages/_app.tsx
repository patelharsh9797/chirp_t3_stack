import { type AppType } from "next/app";

import { api } from "~/utils/api";
import { ClerkProvider } from "@clerk/nextjs";

import "~/styles/globals.css";
import HotToast from "~/components/HotToast";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps}>
      <HotToast />
      <Component {...pageProps} />
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
