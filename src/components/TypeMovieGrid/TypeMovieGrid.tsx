import { useState, useEffect } from "react";
import useRequest from "../../hooks/useRequest";
import { MovieWithGenres } from "../../types/type";
import MovieGrid from "../movieGrid/MovieGrid";
import "./typeMovieGrid.scss";

interface IProps {
  type: string;
}

export default function TypeMovieGrid({ type }: IProps) {
  const [movies, setMovies] = useState<MovieWithGenres[]>([]);
  const { fetchMoviesWithGenres } = useRequest();

  useEffect(() => {
    const fetchMovies = async () => {
      let url = "";
      switch (type) {
        case "trending":
          url = import.meta.env.VITE_TRENDING_MOVIES;
          break;
        case "recent":
          url = import.meta.env.VITE_NOW_PLAYING_MOVIES;
          break;
        case "popular":
          url = import.meta.env.VITE_POPULAR_MOVIES;
          break;
        case "top-rated":
          url = import.meta.env.VITE_TOP_RATED_MOVIES;
          break;
        case "upcoming":
          url = import.meta.env.VITE_UPCOMING_MOVIES;
          break;
        default:
          break;
      }
      try {
        const response = await fetchMoviesWithGenres({ url });
        await setMovies(response);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMovies();
  }, [type]);

  const title: string = type
    ? type.charAt(0).toUpperCase() + type.slice(1)
    : "";

  return (
    <div className="type-movie-grid">
      <h1 className="type-movie-grid__title">{title}</h1>
      <MovieGrid movies={movies} />
    </div>
  );
}
