import React, { FC } from "react";
import Image from "next/image";
import styles from "./card.module.css";

type CardProps = {
  imageUrl: string;
  name: string;
  description?: string;
  index?: number;
};

const Card: FC<CardProps> = ({
  imageUrl,
  name,
  description = "",
  index = "",
}) => {
  return (
    <>
      <div className={styles.cardContainer}>
        <div
          className={
            description
              ? styles.imageDescriptiopnContainer
              : styles.imageContainer
          }
        >
          <Image
            className={styles.image}
            fill
            alt="cat"
            src={imageUrl}
            sizes="(max-width: 1024px) 130px"
          />
        </div>
        {description ? (
          <div className={styles.descriptionContainer}>
            <h2 className={styles.descriptionName}>
              {index}. {name}
            </h2>
            <p className={styles.description}>{description}</p>
          </div>
        ) : null}
      </div>

      {!description ? <p className={styles.cardName}>{name}</p> : null}
    </>
  );
};

export default Card;
