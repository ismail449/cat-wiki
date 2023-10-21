import React, { FC, InputHTMLAttributes } from "react";
import styles from "./search-bar.module.css";

type SearchBarProps = {} & InputHTMLAttributes<HTMLInputElement>;

const SearchBar: FC<SearchBarProps> = ({ placeholder, ...otherProps }) => {
  return (
    <input
      className={styles.input}
      type="search"
      placeholder={placeholder}
      {...otherProps}
    />
  );
};

export default SearchBar;
