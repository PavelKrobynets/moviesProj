import { Search as SearchIcon } from "lucide-react";
import { useState, useRef, useCallback } from "react";
import useRequest from "../../hooks/useRequest";
import { MovieWithGenres } from "../../types/type.ts";
import { debounce } from "lodash";
import "./search.scss";

export default function Search() {
  const [input, setInput] = useState<string>();
  const [results, setResults] = useState<MovieWithGenres[] | unknown>();
  const { fetchMoviesWithGenres } = useRequest();
  const ref = useRef<HTMLInputElement | null>(null);

  const debouncedHandleInput = useCallback(
    debounce(async () => {
      if (ref.current) {
        const value = ref.current.value;
        setInput(value);

        if (value.trim()) {
          try {
            const searchResults = await fetchMoviesWithGenres({
              url: `${import.meta.env.VITE_SEARCH}query=${encodeURIComponent(
                value
              )}&include_adult=true&language=en-US&page=1`,
            });
            setResults(searchResults);
          } catch (error) {
            console.error("Error fetching movies:", error);
            setResults([]);
          }
        } else {
          setResults([]);
        }
      }
      console.log(results);
    }, 300),
    [input]
  );

  return (
    <section className="search">
      <div className="search-container">
        <h2>Search for your favorite movies</h2>
        <div className="search-field">
          <input
            ref={ref}
            type="search"
            onChange={(e) => setInput(e.target.validationMessage)}
            placeholder="Search for a movie"
            className="search-field__input"
          ></input>
          <button
            onClick={debouncedHandleInput}
            className="search-field__button"
          >
            <SearchIcon />
          </button>
        </div>
      </div>
    </section>
  );
}
