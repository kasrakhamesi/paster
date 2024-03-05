import RootProvider from "@/components/providers/RootProvider";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Toaster } from "react-hot-toast";
import { Montserrat } from "next/font/google";
import NProgress from "nprogress";

import "@/styles/nprogress.css";
import "@/styles/style.css";

const inter = Montserrat({ subsets: ["latin"] });

import clsx from "clsx";
import { TailwindIndicator } from "@/components/ui/tailwind-indicator";
import { ThemeContextProvider } from "@/context/ThemeContext";
import { useEffect } from "react";

export default function App({ Component, pageProps, router }: AppProps) {
  useEffect(() => {
    const handleRouteStart = () => NProgress.start();
    const handleRouteDone = () => NProgress.done();

    router.events.on("routeChangeStart", handleRouteStart);
    router.events.on("routeChangeComplete", handleRouteDone);
    router.events.on("routeChangeError", handleRouteDone);

    return () => {
      // Make sure to remove the event handler on unmount!
      router.events.off("routeChangeStart", handleRouteStart);
      router.events.off("routeChangeComplete", handleRouteDone);
      router.events.off("routeChangeError", handleRouteDone);
    };
  }, []);

  if (process.env.NODE_ENV === "production") {
    console.log = () => 0;
    console.debug = () => 0;
  }

  return (
    <>
      <Head>
        <title>Asterfi</title>
      </Head>
      <RootProvider>
        <ThemeContextProvider>
          <div
            className={clsx(
              inter.className,
              "flex flex-col w-full min-h-screen overflow-x-hidden lg:flex-row "
            )}
          >
            <Component {...pageProps} />
            <TailwindIndicator />
            <Toaster />
          </div>
        </ThemeContextProvider>
      </RootProvider>
    </>
  );
}
