import { useState, useEffect, useRef } from "react";
import HeroImagelg from "../../assets/images/HeroImagelg.png";
import CatIcon from "../../components/icons/cat-icon";
import MagnifyingGlassIcon from "../../components/icons/magnifying-glass";
import Input from "../../components/input/input";
import getSearchSuggestions, {
  SearchSuggestion,
} from "../../data-fetching/get-search-suggestions";
import { useClickOutSide } from "../../hooks/useClickOutSide";
import "./home.scss";
import Spinner from "../../components/loading-spinner/loading-spinner";

const Home = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState<
    SearchSuggestion[]
  >([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const { clickedOutSide, setClickedOutSide } = useClickOutSide(
    true,
    searchRef
  );

  useEffect(() => {
    if (searchInput.length === 0) return;
    setIsLoading(true);
    const timeout = setTimeout(async () => {
      const suggestions = await getSearchSuggestions(searchInput);
      if (typeof suggestions === "string") {
        setErrorMessage(suggestions);
      } else if (suggestions) {
        setErrorMessage("");
        setSearchSuggestions(suggestions);
      }
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timeout);
  }, [searchInput]);

  const handleSearch = (searchValue: string) => {
    setClickedOutSide(false);
    setSearchInput(searchValue);
  };

  return (
    <div className="home">
      <div className="search-section">
        <section className="search-section-body">
          <CatIcon width="90%" fill="#FFFFFF" />
          <p>Get to know more about your cat breed</p>
          <Input
            value={searchInput}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Enter your breed"
            width="90%"
            icon={<MagnifyingGlassIcon width="17px" />}
          />

          {!clickedOutSide && !!searchInput.length ? (
            <div ref={searchRef} className="search-suggestions-container">
              {!isLoading ? (
                <div className="search-suggestions">
                  {!!errorMessage.length ? (
                    <span>{errorMessage}</span>
                  ) : (
                    searchSuggestions?.map((suggestion) => (
                      <div className="suggestions-item" key={suggestion.id}>
                        {suggestion.name}
                      </div>
                    ))
                  )}
                </div>
              ) : (
                <Spinner text="Searching..." />
              )}
            </div>
          ) : null}
        </section>
        <div className="search-section-image">
          <img src={HeroImagelg} alt="cat" />
        </div>
      </div>
    </div>
  );
};

export default Home;
