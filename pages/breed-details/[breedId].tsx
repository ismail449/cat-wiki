import React from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next/types";
import { getBreedById } from "@/lib/cat-breed";
import { Breed } from "@/lib/db/mongoDB";

const BreedDetails = ({
  breed,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  if (typeof breed === "string") {
    return <span>{breed}</span>;
  }
  breed;
  return <div>{breed.breedData.name}</div>;
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
