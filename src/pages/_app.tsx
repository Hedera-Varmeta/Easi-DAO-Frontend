import createEmotionCache from "@/styles/createEmotionCache";
import "@/styles/globals.css";
import "@/styles/animations.css";
import 'styles/nprogress.css';

import { CacheProvider, EmotionCache } from "@emotion/react";
import { useRouteLoading } from "hooks/useRouteLoading";
import { NextPage } from "next";
import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ReactElement, ReactNode, useState } from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import store from "../store";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GOOGLE_ID } from "@/utils/constants";
import dynamic from "next/dynamic";
import HederaWalletProvider from "context/HederaContext";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export const CustomThemeProvider = dynamic(
  () => import("@/styles/theme/Provider"),
  {
    ssr: false,
  }
);

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const queryClientOption = {
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, retry: false, staleTime: 1000 * 5 },
  },
};

function App(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [queryClient] = useState(() => new QueryClient(queryClientOption));
  const getLayout = Component.getLayout || ((page) => page);

  useRouteLoading();
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Provider store={store}>
        <CustomThemeProvider>
          <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
              <HederaWalletProvider>
                {getLayout(<Component {...pageProps} />)}
              </HederaWalletProvider>
            </Hydrate>
          </QueryClientProvider>
        </CustomThemeProvider>
      </Provider>
    </CacheProvider>
  );
}
export default appWithTranslation(App);
