import { useEffect, useState } from "react";
import Header from "../header/Header";
import "./App.scss";

interface movie {
  backdrop_path: string;
}

function App() {
  const [movies, setMovies] = useState<movie[] | null>(null);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: import.meta.env.VITE_API_AUTHORIZATION,
    },
  };

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
      options
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((response) => setMovies(response.results))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <Header />
      <section className="body">
        {movies?.map((movie) => {
          return (
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
              alt="image"
            />
          );
        })}
      </section>
    </>
  );
}

export default App;
