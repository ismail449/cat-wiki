import "@/styles/globals.css";
import { Montserrat } from "next/font/google";
import type { AppProps } from "next/app";
import Layout from "@/components/layout/layout";

const montserrat = Montserrat({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={montserrat.className}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </main>
  );
}
