import { Search as SearchIcon } from "lucide-react";
import "./search.scss";

export default function Search() {
  return (
    <section className="search">
      <h1>Search for your favorite movies</h1>
      <div className="field">
        <input
          type="search"
          placeholder="Search for a movie"
          className="search__input"
        ></input>
        <button className="search__button">
          <SearchIcon />
        </button>
      </div>
    </section>
  );
}
