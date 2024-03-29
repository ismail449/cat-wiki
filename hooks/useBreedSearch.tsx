import { useEffect, useState } from "react";

const useBreedSearch = (breedName: string) => {
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const debouncedFn = setTimeout(() => {
      handleBreedSearch(breedName);
    }, 600);
    return () => clearTimeout(debouncedFn);
  }, [breedName]);

  const handleBreedSearch = async (breedName: string) => {
    try {
      if (!breedName.trim()) {
        setSearchResults([]);
        return;
      }
      setLoading(true);
      const response = await fetch(`/api/search-breeds/${breedName}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const data = await response.json();
      setLoading(false);
      if (data.message) {
        console.log(data.message);
        setError(data.message);
        return;
      }
      setError("");
      setSearchResults(data);
    } catch (error) {
      setError("Breed not found");
      setLoading(false);
    }
  };
  return { searchResults, error, loading };
};

export default useBreedSearch;
