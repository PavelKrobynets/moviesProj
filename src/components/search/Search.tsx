import { Search as SearchIcon } from "lucide-react";
import { useState, useRef, useCallback } from "react";
import useRequest from "../../hooks/useRequest";
import { MovieWithGenres } from "../../types/type.ts";
import { debounce } from "lodash";
import "./search.scss";

interface SearchProps {
  getMovies: (movies: MovieWithGenres[]) => void;
}

export default function Search({ getMovies }: SearchProps) {
  const [input, setInput] = useState<string>();
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
              )}&include_adult=false&language=en-US&page=1`,
            });
            getMovies(searchResults);
          } catch (error) {
            console.error("Error fetching movies:", error);
            getMovies([]);
          }
        } else {
          getMovies([]);
        }
      }
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
            onChange={(e) => {
              setInput(e.target.validationMessage);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                debouncedHandleInput();
              }
            }}
            placeholder="Search for a movie"
            className="search-field__input"
          ></input>
          <button
            onClick={debouncedHandleInput}
            className="search-field__button"
            type="submit"
          >
            <SearchIcon />
          </button>
        </div>
      </div>
    </section>
  );
}
