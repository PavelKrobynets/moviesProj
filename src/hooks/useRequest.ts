import { useState, useEffect } from "react";
import { URL, Genre, Movie, MovieWithGenres, SingleMovie } from "../types/type";

let globalGenres: Genre[] | null = null;
let isGenresFetching = false;

export default function useRequest() {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: import.meta.env.VITE_API_AUTHORIZATION,
    },
  };

  const ensureGenresLoaded = async () => {
    // If genres are already loaded, return immediately
    if (globalGenres) {
      return globalGenres;
    }

    // If genres are being fetched, wait for them
    if (isGenresFetching) {
      return new Promise<Genre[]>((resolve) => {
        const checkGenres = () => {
          if (globalGenres) {
            resolve(globalGenres);
          } else {
            setTimeout(checkGenres, 100);
          }
        };
        checkGenres();
      });
    }

    // If genres need to be fetched, fetch them
    isGenresFetching = true;
    try {
      const response = await fetch(import.meta.env.VITE_GENRES, options);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      globalGenres = data.genres;
      setIsLoading(false);
      return data.genres;
    } catch (error) {
      console.log("Failed fetching genres", error);
      setIsLoading(false);
      throw error;
    } finally {
      isGenresFetching = false;
    }
  };

  useEffect(() => {
    ensureGenresLoaded();
  }, []);

  const fetchMovies = async (): Promise<Movie[]> => {
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
    const genres = await ensureGenresLoaded();

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
              const genre = genres.find((genre: Genre) => genre.id === id);
              return genre ? genre.name : null;
            })
            .filter(Boolean),
        })
      );
      console.log(moviesWithGenres[0].id);
      return moviesWithGenres;
    } catch (error) {
      console.error(`Failed fetching movies`, error);
      throw error;
    }
  };

  const fetchMovieById = async ({ url }: URL): Promise<SingleMovie> => {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      const movie: SingleMovie = {
        ...data,
        genres: data.genres.map((item: Genre) => {
          return item.name;
        }),
      };
      return movie;
    } catch (error) {
      console.error(`Failed fetching movie`, error);
      throw error;
    }
  };

  return {
    fetchMovies,
    fetchMoviesWithGenres,
    isLoadingGenres: isLoading,
    fetchMovieById,
  };
}
