import React from "react";
import styles from "./search-modal.module.css";
import SearchBar from "../search-bar/search-bar";

const SearchModal = () => {
  return (
    <div className={styles.searchModal}>
      <div className={styles.searchModalContainer}>
        <span className={styles.closeModal}>x</span>
        <div className={styles.searchBar}>
          <SearchBar showBorder />
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
