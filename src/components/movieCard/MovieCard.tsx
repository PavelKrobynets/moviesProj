import "./movieCard.scss";
import { MovieWithGenres } from "../../types/type";

interface MovieCardProps {
  movie: MovieWithGenres;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <div className="movie-card">
      {movie.poster_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt="movie-image"
          className="movie-card__image"
        />
      ) : (
        <img
          src="/src/assets/poster-placeholder.jpg"
          alt="default-movie-image"
          className="movie-card__image"
        />
      )}

      <div className="movie-card__info">
        <p className="movie-card__info-title">{movie.title}</p>
        <p className="movie-card__info-text">{`${
          movie.release_date
        }, ${movie.genres.join(" ")}`}</p>
      </div>
    </div>
  );
}
