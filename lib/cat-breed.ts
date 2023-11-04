import {
  Breed,
  BreedCount,
  client,
  collectionName,
  dbName,
} from "./db/mongoDB";

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
