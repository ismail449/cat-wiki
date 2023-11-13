import { BreedData } from "@/lib/db/mongoDB";
import { axiosInstance } from "@/lib/axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method !== "GET") {
    return res.status(405).json({});
  }
  try {
    const { data } = await axiosInstance<BreedData[]>("/breeds");
    const breedName = req.query.breedName as string;
    const filteredBreeds = data.filter((breed) => {
      return breed.name
        .toLocaleLowerCase()
        .includes(breedName.toLocaleLowerCase());
    });
    if (filteredBreeds.length === 0) {
      res.status(404).send("Breed NOT Found");
      return;
    }
    const newFilteredBreeds = filteredBreeds.map((breed) => {
      return { name: breed.name, id: breed.id };
    });
    res.send(newFilteredBreeds);
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).send(error.message);
    }
  }
}
