import { useEffect, useState } from "react";

const useBreedSearch = (breedName: string) => {
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const debouncedFn = setTimeout(() => {
      handleBreedSearch(breedName);
    }, 600);
    return () => clearTimeout(debouncedFn);
  }, [breedName]);

  const handleBreedSearch = async (breedName: string) => {
    if (!breedName.trim()) {
      setSearchResults([]);
      return;
    }
    const response = await fetch(`/api/search-breeds/${breedName}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data = await response.json();
    setSearchResults(data);
  };
  return searchResults;
};

export default useBreedSearch;
