import { useState, useEffect } from "react";
import { URL, Genre, Movie, MovieWithGenres } from "../types/type";
import { rejects } from "assert";

export default function useRequest() {
  const [genres, setGenres] = useState<Genre[] | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: import.meta.env.VITE_API_AUTHORIZATION,
    },
  };

  const fetchGenres = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_GENRES, options);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      await setGenres(data.genres);
      setIsLoading(false);
    } catch (error) {
      console.log("Failed fetching genres", error);
      setIsLoading(false);
      throw error;
    }
  };

  useEffect(() => {
    fetchGenres();
    console.log("Fetching genres", genres);
  }, []);

  const fetchMovies = async ({ url }: URL): Promise<Movie[]> => {
    fetch(url, options).then((res) => res.json());

    try {
      const response = await fetch(
        import.meta.env.VITE_TRENDING_MOVIES,
        options
      );
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error("Failed fetching movies(default)", error);
      throw error;
    }
  };

  const fetchMoviesWithGenres = async ({
    url,
  }: URL): Promise<MovieWithGenres[]> => {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        clearInterval(checkGenres);
        reject(new Error("Timeout waiting for genres"));
      }, 10000);

      const checkGenres = setInterval(async () => {
        if (!isLoading && genres) {
          clearInterval(checkGenres);
          clearTimeout(timeout);
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
                    const genre = genres.find((genre) => genre.id === id);
                    return genre ? genre.name : null;
                  })
                  .filter(Boolean),
              })
            );
            resolve(moviesWithGenres);
          } catch (error) {
            reject(error);
            console.error(`Failed fetching movies`, error);
          }
        }
      }, 100);
    });
  };

  return { fetchMovies, fetchMoviesWithGenres, isLoadingGenres: isLoading };
}
