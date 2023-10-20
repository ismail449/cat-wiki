import Head from "next/head";
import Image from "next/image";
import CatwikiLogo from "@/components/cat-wiki-logo/cat-wiki-logo";
import styles from "@/styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>Cat Wiki</title>
        <meta
          name="description"
          content="Cat-wiki is a site where you can search for different cat breeds"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/devchallenges.png" />
      </Head>
      <main className={`${styles.main}`}>
        <div className={`${styles.catWikiLogo}`}>
          <CatwikiLogo />
        </div>
        <section className={`${styles.searchBarSection}`}></section>
      </main>
    </>
  );
}
