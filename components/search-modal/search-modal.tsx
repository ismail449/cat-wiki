import React, { ChangeEvent, useState } from "react";
import styles from "./search-modal.module.css";
import SearchBar from "../search-bar/search-bar";
import SearchResults from "../search-results-list/search-results-list";
import useBreedSearch from "@/hooks/useBreedSearch";

const SearchModal = () => {
  const [breedName, setBreedName] = useState("");
  const searchResults = useBreedSearch(breedName);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBreedName(e.target.value);
  };
  return (
    <div className={styles.searchModal}>
      <div className={styles.searchModalContainer}>
        <span className={styles.closeModal}>x</span>
        <div className={styles.searchBar}>
          <SearchBar onChange={handleSearchChange} showBorder />
          <SearchResults height="100vh" searchResults={searchResults} />
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
