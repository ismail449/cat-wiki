import React, { FC } from "react";
import Image from "next/image";
import styles from "./card.module.css";

type CardProps = {
  imageUrl: string;
  name: string;
};

const Card: FC<CardProps> = ({ imageUrl, name }) => {
  return (
    <div>
      <div className={styles.imageContainer}>
        <Image className={styles.image} fill alt="cat" src={imageUrl} />
      </div>
      <p>{name}</p>
    </div>
  );
};

export default Card;
