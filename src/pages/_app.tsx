import Head from "next/head";
import { type AppType } from "next/app";
import { Toaster } from "react-hot-toast";

import { api } from "../utils/api";

import "../styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Eleckron</title>
        <meta name="description" content="Eleckron" />
      </Head>
      <Component {...pageProps} />
      <Toaster
        position="bottom-left"
        reverseOrder={false}
        toastOptions={{
          style: {
            fontSize: 14,
          },
        }}
      />
    </>
  );
};

export default api.withTRPC(MyApp);
