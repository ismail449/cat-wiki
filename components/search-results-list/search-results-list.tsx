import React, { FC } from "react";
import { useRouter } from "next/router";
import styles from "./search-results-list.module.css";

type SearchResultsProps = {
  searchResults: { name: string; id: string }[];
  height?: string;
};

const SearchResults: FC<SearchResultsProps> = ({ searchResults, height }) => {
  const router = useRouter();
  return (
    <>
      {searchResults.length > 0 ? (
        <div className={`${styles.searchResultsContainer}`}>
          <ul
            className={`${styles.searchResults}`}
            style={{ maxHeight: height }}
          >
            {searchResults.map((breed) => {
              return (
                <li
                  onClick={() => router.push(`/breed-details/${breed.id}`)}
                  className={`${styles.searchResultItem}`}
                  key={breed.id}
                >
                  {breed.name}
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </>
  );
};

export default SearchResults;
