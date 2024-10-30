import { useState, useEffect } from "react";
import { URL, Genre, Movie, MovieWithGenres } from "../types/type";

export default function useRequest() {
  const [genres, setGenres] = useState<Genre[] | undefined>();
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: import.meta.env.VITE_API_AUTHORIZATION,
    },
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_GENRES, options);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      await setGenres(data);
      setGenres(data.genres);
    } catch (error) {
      console.log("Failed fetching genres", error);
      throw error;
    }
  };

  const fetchMovies = async ({ url }: URL) => {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      const moviesWithGenres: MovieWithGenres[] = data.results.map(
        (movie: Movie) => ({
          ...movie,
          genres: movie.genre_ids
            .map((id) => {
              const genre = genres?.find((genre) => genre.id === id);
              return genre ? genre.name : "";
            })
            .filter(Boolean),
        })
      );
      console.log(moviesWithGenres);
      return moviesWithGenres;
    } catch (error) {
      console.error(`Failed fetching trending movies`, error);
      throw error;
    }
  };
  return { fetchMovies, fetchGenres, genres };
}
