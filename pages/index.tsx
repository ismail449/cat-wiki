import { ChangeEvent, useState } from "react";
import type { InferGetStaticPropsType, GetStaticProps } from "next";
import Image from "next/image";

import Head from "next/head";
import CatwikiLogo from "@/components/cat-wiki-logo/cat-wiki-logo";
import SearchBar from "@/components/search-bar/search-bar";
import styles from "@/styles/Home.module.css";
import SearchModal from "@/components/search-modal/search-modal";
import TopSearchedBreedsSection from "@/components/top-searched-breeds-section/top-searched-breeds-section";
import SearchResults from "@/components/search-results-list/search-results-list";
import useBreedSearch from "@/hooks/useBreedSearch";
import useDidClickOutside from "@/hooks/useDidClickOutside";
import { getTopTenSearchedBreeds } from "@/lib/cat-breed";
import { BreedCount } from "@/lib/db/mongoDB";
import Link from "next/link";

export default function Home({
  topTenSearchedBreeds,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [breedName, setBreedName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log({ topTenSearchedBreeds });

  const searchResults = useBreedSearch(breedName);
  const { didClickOutside, ref } = useDidClickOutside();

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBreedName(e.target.value);
  };

  const handleSearchBarClick = () => {
    if (window.innerWidth > 1024) return;
    setIsModalOpen(true);
  };

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
        <section className={`${styles.searchBarSection}`}>
          <div className={`${styles.searchBarContentContainer}`}>
            <CatwikiLogo color="white" width="35vmin" height="12vmin" />
            <h3 className={`${styles.searchBarDescription}`}>
              Get to know more about your cat breed
            </h3>
            <div ref={ref} className={`${styles.searchBarWrapper}`}>
              <SearchBar
                onChange={handleSearchChange}
                placeholder="Enter your breed"
                onClick={handleSearchBarClick}
              />
              {!didClickOutside && (
                <SearchResults searchResults={searchResults} />
              )}
            </div>
          </div>
        </section>
        <section className={styles.discoverBreeds}>
          <div className={styles.discoverBreedsContainer}>
            <p>Most Searched Breeds</p>
            <div className={styles.underLine} />
            <h2 className={styles.discoverBreedsInfo}>
              66+ Breeds For you to discover
            </h2>
            <div className={styles.topSearchedBreeds}>
              <TopSearchedBreedsSection
                topSearchedBreeds={topTenSearchedBreeds}
              />
            </div>
          </div>
        </section>
        <section className={styles.whyShouldOwenCatSection}>
          <div>
            <h2 className={styles.title}>Why should you have a cat?</h2>
            <p className={styles.answer}>
              Having a cat around you can actually trigger the release of
              calming chemicals in your body which lower your stress and anxiety
              levels
            </p>
            <Link
              href="https://www.helpguide.org/articles/healthy-living/joys-of-owning-a-cat.htm"
              target="_blank"
            >
              <span className={styles.readMore}>READ MORE →</span>
            </Link>
          </div>
          <div className={styles.images}>
            <div className={styles.image1And2Container}>
              <div className={styles.image2Container}>
                <Image fill src="/images/image 2.png" alt="sad" />
              </div>
              <div className={styles.image1Container}>
                <Image fill src="/images/image 1.png" alt="sad" />
              </div>
            </div>

            <div className={styles.image3Container}>
              <Image fill src="/images/image 3.png" alt="sad" />
            </div>
          </div>
        </section>
        <SearchModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </main>
    </>
  );
}

export const getStaticProps = (async () => {
  const topTenSearchedBreeds = await getTopTenSearchedBreeds();

  return {
    props: { topTenSearchedBreeds },
    revalidate: 10,
  };
}) satisfies GetStaticProps<{
  topTenSearchedBreeds: BreedCount[];
}>;
