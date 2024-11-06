import { useParams } from "react-router-dom";
import useRequest from "../../hooks/useRequest";
import { useEffect, useState } from "react";
import { MovieWithGenres } from "../../types/type";
import "./movieInfo.scss";

export default function MovieInfo() {
  const { id } = useParams();
  const { fetchMovieById } = useRequest();
  const [movie, setMovie] = useState<MovieWithGenres | null>(null);

  useEffect(() => {
    fetchMovieById({
      url: `https://api.themoviedb.org/3/find/${id}?external_source=`,
    }).then((res) => {
      setMovie(res);
    });
  }, []);

  if (!movie) {
    <div>Loading...</div>;
  }

  return (
    <div className="movie-info">
      <img
        src={
          movie?.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "/src/assets/poster-placeholder.jpg"
        }
        alt={movie?.title}
        className="movie-info__image"
      ></img>
      <div className="movie-info__container">
        <h2 className="movie-info__title">{movie?.title}</h2>
        <p className="movie-info__description">{movie?.overview}</p>
        <p className="movie-info__genre">{movie?.genres}</p>
        <p className="movie-info__year">{movie?.release_date}</p>
        <p className="movie-info__rating">{movie?.vote_average.toFixed(1)}</p>
      </div>
    </div>
  );
}
