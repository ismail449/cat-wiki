import React, { FC } from "react";
import Image from "next/image";
import styles from "./card.module.css";

type CardProps = {
  imageUrl: string;
  name: string;
};

const Card: FC<CardProps> = ({ imageUrl, name }) => {
  return (
    <>
      <div className={styles.imageContainer}>
        <Image
          className={styles.image}
          fill
          alt="cat"
          src={imageUrl}
          sizes="(max-width: 1024px) 130px"
        />
      </div>
      <p className={styles.cardName}>{name}</p>
    </>
  );
};

export default Card;
