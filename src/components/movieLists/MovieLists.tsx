import MovieList from "../movieList/MovieList";
import "./movieLists.scss";

export default function MovieLists() {
  return (
    <div className="movie-lists">
      <MovieList id="list1" />
      <MovieList id="list2" />
      <MovieList id="list3" />
    </div>
  );
}
