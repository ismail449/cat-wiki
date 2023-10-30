import { ChangeEvent, useState } from "react";
import Head from "next/head";
import CatwikiLogo from "@/components/cat-wiki-logo/cat-wiki-logo";
import SearchBar from "@/components/search-bar/search-bar";
import styles from "@/styles/Home.module.css";
import SearchModal from "@/components/search-modal/search-modal";
import SearchResults from "@/components/search-results-list/search-results-list";
import useBreedSearch from "@/hooks/useBreedSearch";

export default function Home() {
  const [breedName, setBreedName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const searchResults = useBreedSearch(breedName);

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
            <div className={`${styles.searchBarWrapper}`}>
              <SearchBar
                onChange={handleSearchChange}
                placeholder="Enter your breed"
                onClick={handleSearchBarClick}
              />
              <SearchResults searchResults={searchResults} />
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
