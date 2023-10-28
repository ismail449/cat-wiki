import { ChangeEvent, useState, useEffect } from "react";
import Head from "next/head";
import CatwikiLogo from "@/components/cat-wiki-logo/cat-wiki-logo";
import SearchBar from "@/components/search-bar/search-bar";
import styles from "@/styles/Home.module.css";

export default function Home() {
  const [breedName, setBreedName] = useState("");
  const [searchResults, setSearchResults] = useState<
    { name: string; id: string }[]
  >([]);

  useEffect(() => {
    const debouncedFn = setTimeout(() => {
      handleBreedSearch(breedName);
    }, 600);
    return () => clearTimeout(debouncedFn);
  }, [breedName]);

  const handleBreedSearch = async (breedName: string) => {
    if (!breedName.trim()) {
      setSearchResults([]);
      return;
    }
    const response = await fetch(`/api/search-breeds/${breedName}`);
    const data = await response.json();
    setSearchResults(data);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBreedName(e.target.value);
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
              />
              <div className={`${styles.searchResultsContainer}`}>
                <ul className={`${styles.searchResults}`}>
                  {searchResults.map((breed) => {
                    return (
                      <li
                        className={`${styles.searchResultItem}`}
                        key={breed.id}
                      >
                        {breed.name}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
