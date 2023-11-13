import React from "react";
import { useRouter } from "next/router";

const BreedDetails = () => {
  const router = useRouter();
  return <div>{router.query["breed-id"]}</div>;
};

export default BreedDetails;
