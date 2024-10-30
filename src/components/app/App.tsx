import Header from "../header/Header";
import Slider from "../slider/Slider";
import MovieLists from "../movieLists/MovieLists";
import { GenresProvider } from "../genresProvider/GenresProvider";
import "./App.scss";

function App() {
  return (
    <div className="app">
      <Header />
      <Slider />
      <GenresProvider>
        <MovieLists />
      </GenresProvider>
    </div>
  );
}

export default App;
