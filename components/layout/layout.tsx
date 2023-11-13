import React, { FC, ReactNode } from "react";
import Footer from "../footer/footer";
import CatwikiLogo from "../cat-wiki-logo/cat-wiki-logo";
import styles from "./layout.module.css";
import Link from "next/link";

type LayoutProps = {
  children: ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <div className={`${styles.catWikiLogo}`}>
        <Link href={"/"}>
          <CatwikiLogo />
        </Link>
      </div>
      <div>{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
