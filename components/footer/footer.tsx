import React from "react";
import styles from "./footer.module.css";
import CatwikiLogo from "@/components/cat-wiki-logo/cat-wiki-logo";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <CatwikiLogo color="white" />
        <p className={styles.createdBy}>
          &copy; created by{" "}
          <a href="https://github.com/ismail449" target="_blank">
            ismail449
          </a>{" "}
          - devChallenge.io 2021
        </p>
      </div>
    </footer>
  );
};

export default Footer;
