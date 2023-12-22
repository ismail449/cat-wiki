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
  const { breedData, images } = breed;
  return (
    <>
      <Head>
        <title>{breedData.name}</title>
      </Head>
      <div className={styles.breedContainer}>
        <div className={styles.breedDetails}>
          <div className={styles.imageContainer}>
            <Image
              className={styles.image}
              fill
              sizes="(max-width: 1024px) 250px"
              src={images[0].url}
              alt={breedData.name}
              loading="lazy"
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
              <span>Adaptability:</span>
              <div>
                <Level maxLevel={5} level={breedData.adaptability} />
              </div>

              <span>Affection level:</span>
              <div>
                <Level maxLevel={5} level={breedData.affection_level} />
              </div>
              <span>Child Friendly:</span>
              <div>
                <Level maxLevel={5} level={breedData.child_friendly} />
              </div>
              <span>Grooming:</span>
              <div>
                <Level maxLevel={5} level={breedData.grooming} />
              </div>
              <span>Intelligence:</span>
              <div>
                <Level maxLevel={5} level={breedData.intelligence} />
              </div>

              <span>Health issues:</span>
              <div>
                <Level maxLevel={5} level={breedData.health_issues} />
              </div>

              <span>Social needs:</span>
              <div>
                <Level maxLevel={5} level={breedData.social_needs} />
              </div>

              <span>Stranger friendly:</span>
              <div>
                <Level maxLevel={5} level={breedData.stranger_friendly} />
              </div>
            </div>
          </div>
        </div>
        <h2 className={styles.breedImagesTitle}>Other photos</h2>
        <div className={styles.breedImages}>
          {images.map(({ url, id }, index) => {
            return (
              <div className={styles.imageItemContainer} key={id}>
                <Image
                  className={styles.imageItem}
                  src={url}
                  fill
                  sizes="(max-width: 1024px) 250px"
                  alt={`${breedData.name}-${index}`}
                  loading="lazy"
                />
              </div>
            );
          })}
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
