import "@/styles/globals.css";
import { useRouter } from "next/router";
import { Montserrat } from "next/font/google";
import type { AppProps } from "next/app";
import Layout from "@/components/layout/layout";
import Head from "next/head";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/loading-spinner/loading-spinner";

const montserrat = Montserrat({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const handleStart = () => {
      setLoading(true);
    };
    const handleComplete = () => {
      setLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
    };
  }, [router.events]);
  return (
    <>
      <Head>
        <link rel="icon" href="/devchallenges.png" />
      </Head>
      <main className={montserrat.className}>
        {
          <Layout>
            {loading ? <LoadingSpinner /> : null}
            <Component {...pageProps} />
          </Layout>
        }
      </main>
    </>
  );
}
