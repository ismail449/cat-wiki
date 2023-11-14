import React from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next/types";
import Image from "next/image";
import { getBreedById } from "@/lib/cat-breed";
import { Breed } from "@/lib/db/mongoDB";
import styles from "@/styles/breed-details.module.css";
import Head from "next/head";

const BreedDetails = ({
  breed,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  if (typeof breed === "string") {
    return <span>{breed}</span>;
  }
  const { breedData } = breed;
  return (
    <>
      <Head>
        <title>{breedData.name}</title>
      </Head>
      <div className={styles.breedDetails}>
        <div className={styles.imageContainer}>
          <Image
            className={styles.image}
            fill
            sizes="(max-width: 1024px) 100%"
            src={breed.images[0].url}
            alt={breed.breedData.name}
            priority
          />
        </div>
        <div className={styles.detailsContainer}>
          <h2 className={styles.breedDetailsTitle}>{breedData.name}</h2>
          <p className={styles.breedDetailsDescription}>
            {breedData.description}
          </p>
          <p className={styles.breedinfo}>
            <span>Temperament:</span> {breedData.temperament}{" "}
          </p>
          <p className={styles.breedinfo}>
            <span>Origin:</span> {breedData.origin}{" "}
          </p>
          <p className={styles.breedinfo}>
            <span>Life Span:</span> {breedData.life_span} years
          </p>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = (async (context) => {
  const breedId = context.query.breedId as string;
  const breed = await getBreedById(breedId);
  if (!breed) return { props: { breed: "something went wrong" } };
  return { props: { breed } };
}) satisfies GetServerSideProps<{
  breed: Breed | string;
}>;

export default BreedDetails;
