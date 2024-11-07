import "./movieGrid.scss";
import MovieCard from "../movieCard/MovieCard";
import { MovieWithGenres } from "../../types/type";
import { Link } from "react-router-dom";

interface MovieGridProps {
  movies: MovieWithGenres[] | undefined;
}

export default function MovieGrid({ movies }: MovieGridProps) {
  console.log(movies);
  return (
    <div className="movie-grid">
      <div className="movie-grid__container">
        {movies && movies.length > 0 ? (
          movies.map((movie) => (
            <Link key={movie.id} to={`/movie/${movie.id}`}>
              <MovieCard key={movie.id} movie={movie} />
            </Link>
          ))
        ) : (
          <p>No movies found.</p>
        )}
      </div>
    </div>
  );
}
