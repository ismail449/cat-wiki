import React from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next/types";
import Image from "next/image";
import { getBreedById } from "@/lib/cat-breed";
import { Breed } from "@/lib/db/mongoDB";
import styles from "@/styles/breed-details.module.css";

const BreedDetails = ({
  breed,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  if (typeof breed === "string") {
    return <span>{breed}</span>;
  }
  return (
    <div className={styles.breedDetails}>
      <div className={styles.imageContainer}>
        <Image
          className={styles.image}
          fill
          src={breed.images[0].url}
          alt={breed.breedData.name}
          priority
        />
      </div>
      <div></div>
    </div>
  );
};

export const getServerSideProps = (async (context) => {
  const breedId = context.query.breedId as string;
  const breed = await getBreedById(breedId);
  if (!breed) return { props: { breed: "something went wrong" } };
  console.log(breed);
  return { props: { breed } };
}) satisfies GetServerSideProps<{
  breed: Breed | string;
}>;

export default BreedDetails;
