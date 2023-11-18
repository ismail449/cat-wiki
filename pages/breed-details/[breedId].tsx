import React from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next/types";
import Image from "next/image";
import { getBreedById } from "@/lib/cat-breed";
import { Breed } from "@/lib/db/mongoDB";
import styles from "@/styles/breed-details.module.css";
import Head from "next/head";
import Level from "@/components/level/level";

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
          <div className={styles.statsContainer}>
            <p className={styles.breedinfo}>
              <span>Adaptability:</span>{" "}
              <Level maxLevel={5} level={breedData.adaptability} />
            </p>
            <p className={styles.breedinfo}>
              <span>Affection level:</span>
              <Level maxLevel={5} level={breedData.affection_level} />
            </p>
            <p className={styles.breedinfo}>
              <span>Child Friendly:</span>
              <Level maxLevel={5} level={breedData.child_friendly} />
            </p>
            <p className={styles.breedinfo}>
              <span>Grooming:</span>
              <Level maxLevel={5} level={breedData.grooming} />
            </p>
            <p className={styles.breedinfo}>
              <span>Intelligence:</span> {breedData.intelligence}
            </p>
            <p className={styles.breedinfo}>
              <span>Health issues:</span> {breedData.health_issues}
            </p>
            <p className={styles.breedinfo}>
              <span>Social needs:</span> {breedData.social_needs}
            </p>
            <p className={styles.breedinfo}>
              <span>Stranger friendly:</span> {breedData.stranger_friendly}
            </p>
          </div>
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
