import MovieList from "../movieList/MovieList";
import "./movieLists.scss";

export default function MovieLists() {
  return (
    <div className="movie-lists">
      <MovieList
        arrow="list1"
        url={import.meta.env.VITE_NOW_PLAYING_MOVIES}
        title="now playing"
      />
      <MovieList
        arrow="list2"
        url={import.meta.env.VITE_POPULAR_MOVIES}
        title="popular"
      />
      <MovieList
        arrow="list3"
        url={import.meta.env.VITE_TOP_RATED_MOVIES}
        title="top rated"
      />
      <MovieList
        arrow="list4"
        url={import.meta.env.VITE_UPCOMING_MOVIES}
        title="upcoming"
      />
    </div>
  );
}
