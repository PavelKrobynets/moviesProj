import { useParams } from "react-router-dom";
import useRequest from "../../hooks/useRequest";
import { useEffect, useState } from "react";
import { SingleMovie } from "../../types/type";
import "./movieInfo.scss";

export default function MovieInfo() {
  const { id } = useParams();
  const { fetchMovieById } = useRequest();
  const [movie, setMovie] = useState<SingleMovie | null>(null);

  useEffect(() => {
    fetchMovieById({
      url: `${import.meta.env.VITE_SINGLE_MOVIE}${id}?language=en-U`,
    }).then((res) => {
      setMovie(res);
    });
  }, []);

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
      {!movie ? (
        <div>Loading...</div>
      ) : (
        <div className="movie-info__container">
          <h2 className="movie-info__title">{movie.title}</h2>
          <p className="movie-info__tagline">{movie.tagline}</p>
          <p className="movie-info__description">{movie.overview}</p>
          <p className="movie-info__genre">{`Genres: ${movie.genres}`}</p>
          <p className="movie-info__year">{`Release date: ${movie.release_date}`}</p>
          <p className="movie-info__rating">{`Rating: ${movie.vote_average.toFixed(
            1
          )}`}</p>
          <p className="movie-info__runtime">{`Runtime: ${movie.runtime} minutes`}</p>
        </div>
      )}
    </div>
  );
}
