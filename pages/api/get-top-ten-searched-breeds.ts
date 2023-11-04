import { client, dbName, Breed, collectionName } from "@/lib/db/mongoDB";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method !== "GET") {
    return res.status(405).json({});
  }
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
    res.send(topTenSearchedBreeds);
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).send(error.message);
    }
  }
}
