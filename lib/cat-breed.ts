import { Breed } from "./db/mongoDB";

export const getTopTenSearchedBreeds = async (): Promise<Breed[]> => {
  const response = await fetch("/api/get-top-ten-searched-breeds");
  const topTenSearchedBreeds = response.json();
  return topTenSearchedBreeds;
};
