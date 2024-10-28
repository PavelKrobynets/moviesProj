import MovieList from "../movieList/MovieList";
import "./movieLists.scss";

export default function MovieLists() {
  return (
    <div className="movie-lists">
      <MovieList />
      <MovieList />
      <MovieList />
    </div>
  );
}
