import React from "react";
import Head from "next/head";
import styles from "@/styles/top-ten-breeds.module.css";
import { getTopTenSearchedBreeds } from "@/lib/cat-breed";
import { GetStaticProps, InferGetStaticPropsType } from "next/types";
import { BreedCount } from "@/lib/db/mongoDB";
import Card from "@/components/card/card";

const TopTenbreeds = ({
  topTenSearchedBreeds,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const breed = topTenSearchedBreeds[0];
  console.log(breed);
  return (
    <>
      <Head>
        <title>Top 10 most searched breeds</title>
      </Head>
      <div>
        <h1 className={styles.topTenBreedsHeader}>
          Top 10 most searched breeds
        </h1>
        <Card
          imageUrl={breed.imageUrl}
          name={breed.name}
          description={breed.description}
          index={1}
        />
      </div>
    </>
  );
};

export const getStaticProps = (async () => {
  const topTenSearchedBreeds = await getTopTenSearchedBreeds();

  return {
    props: { topTenSearchedBreeds },
    revalidate: 10,
  };
}) satisfies GetStaticProps<{
  topTenSearchedBreeds: BreedCount[];
}>;

export default TopTenbreeds;
