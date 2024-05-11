import React from "react";
import Lottie from "react-lottie";
import animationData from "../../public/cat-loading.json";
import styles from "./loading-spinner.module.css";

const LoadingSpinner = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
  };
  return (
    <div className={styles.loadingSpinner}>
      <Lottie options={defaultOptions} height={400} width={400} />
    </div>
  );
};

export default LoadingSpinner;
