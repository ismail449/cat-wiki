import {
  Breed,
  BreedCount,
  client,
  collectionName,
  dbName,
} from "./db/mongoDB";
import { axiosInstance } from "@/lib/axios";

const imagesLimit = 10;

export const getTopTenSearchedBreeds = async (): Promise<BreedCount[]> => {
  try {
    await client.connect();
    const db = await client.db(dbName);
    const topTenSearchedBreeds = await db
      .collection(collectionName)
      .find<Breed>({})
      .limit(10)
      .sort({ searchCount: -1 })
      .toArray();

    await client.close();
    return topTenSearchedBreeds.map((breed) => {
      return {
        id: breed.id,
        name: breed.breedData.name,
        imageUrl: breed.images[0].url,
        searchCount: breed.searchCount,
      };
    });
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getBreedById = async (breedId: string) => {
  try {
    const { data } = await axiosInstance(
      `/images/search?breed_ids=${breedId}&limit=${imagesLimit}`
    );
    if (data.length === 0) {
      return { message: "breed not found" };
    }
    console.log("data", data);
    await client.connect();
    const db = await client.db(dbName);
    const breedCollection = await db.collection(collectionName);
    const breed = await breedCollection.findOne<BreedCount>({
      id: breedId,
    });
    let resultBreed = {};
    const breedData = data[0].breeds[0];
    const breedImages = data.map((breed: { breeds?: [] }) => {
      delete breed.breeds;
      return breed;
    });
    if (!breed) {
      resultBreed = await breedCollection.insertOne({
        id: breedData.id,
        breedData,
        searchCount: 1,
        images: breedImages,
      });
    } else {
      resultBreed = await breedCollection.updateOne(
        { id: breedId },
        { $set: { searchCount: breed.searchCount + 1 } }
      );
    }
    await client.close();
    return {
      breedData,
      images: breedImages,
    };
  } catch (error) {
    if (error instanceof Error) return { message: error.message };
  }
};
