import React, { FC, InputHTMLAttributes } from "react";
import classNames from "classnames";
import styles from "./search-bar.module.css";

type SearchBarProps = {
  showBorder?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

const SearchBar: FC<SearchBarProps> = ({
  showBorder,
  placeholder,
  ...otherProps
}) => {
  return (
    <input
      className={classNames(styles.input, styles.border)}
      type="search"
      placeholder={placeholder}
      {...otherProps}
    />
  );
};

export default SearchBar;
