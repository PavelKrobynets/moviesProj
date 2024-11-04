import Search from "../components/search/Search";
import MovieGrid from "../components/movieGrid/MovieGrid";
import { useState } from "react";
import { MovieWithGenres } from "../types/type";

export default function SearchPage() {
  const [movies, setMovies] = useState<MovieWithGenres[] | undefined>();

  function getMovies(movies: MovieWithGenres[]) {
    setMovies(movies);
  }
  return (
    <>
      <Search getMovies={getMovies} />
      <MovieGrid movies={movies} />
    </>
  );
}
