import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI || "";
export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const dbName = "cat_wiki";
export const collectionName = "cat-breeds";

export type Breed = {
  id: string;
  name: string;
};
