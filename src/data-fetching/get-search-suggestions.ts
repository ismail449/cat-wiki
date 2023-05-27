export type SearchSuggestion = {
  name: string;
  id: string;
};

const getSearchSuggestions = async (
  searchText: string
): Promise<SearchSuggestion[] | undefined | string> => {
  const baseURL = process.env.REACT_APP_BASE_URL;

  try {
    const data = await fetch(`${baseURL}/search-breeds/${searchText}`);

    if (data.status === 404) {
      const error = await data.text();
      return error;
    }
    const suggestions = await data.json();
    return suggestions;
  } catch (err) {
    if (err instanceof Error) console.log(err.message);
  }
};

export default getSearchSuggestions;
