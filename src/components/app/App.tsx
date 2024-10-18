import { useState, useEffect } from "react";
import reactLogo from "../../assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.scss";

interface movie {
  backdrop_path: string;
}

function App() {
  const [count, setCount] = useState(0);
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
      {movies?.map((movie) => {
        return (
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
            alt="image"
          />
        );
      })}
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
