import React, { FC, ReactNode } from "react";
import Footer from "../footer/footer";
import CatwikiLogo from "../cat-wiki-logo/cat-wiki-logo";
import styles from "./layout.module.css";

type LayoutProps = {
  children: ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <div className={`${styles.catWikiLogo}`}>
        <CatwikiLogo />
      </div>
      <div>{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
