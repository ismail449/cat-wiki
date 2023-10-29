import React, { FC } from "react";
import styles from "./search-results-list.module.css";

type SearchResultsProps = {
  searchResults: { name: string; id: string }[];
};

const SearchResults: FC<SearchResultsProps> = ({ searchResults }) => {
  return (
    <div>
      {searchResults.length > 0 ? (
        <div className={`${styles.searchResultsContainer}`}>
          <ul className={`${styles.searchResults}`}>
            {searchResults.map((breed) => {
              return (
                <li className={`${styles.searchResultItem}`} key={breed.id}>
                  {breed.name}
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default SearchResults;
