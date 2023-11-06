import { BreedCount } from "@/lib/db/mongoDB";
import React, { FC } from "react";
import Card from "../card/card";
import styles from "./top-searched-breeds-section.module.css";

type TopSearchedBreedsProps = {
  topSearchedBreeds: BreedCount[];
};

const TopSearchedBreedsSection: FC<TopSearchedBreedsProps> = ({
  topSearchedBreeds,
}) => {
  return (
    <div className={styles.topSearchedBreeds}>
      {topSearchedBreeds.length > 0 ? (
        topSearchedBreeds.map((breed) => {
          return (
            <Card key={breed.id} imageUrl={breed.imageUrl} name={breed.name} />
          );
        })
      ) : (
        <span>Something went wrong</span>
      )}
    </div>
  );
};

export default TopSearchedBreedsSection;
