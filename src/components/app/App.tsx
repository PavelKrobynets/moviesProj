import Header from "../header/Header";
import Slider from "../slider/Slider";
import MovieLists from "../movieLists/MovieLists";
import "./App.scss";

function App() {
  return (
    <div className="app">
      <Header />
      <Slider />
      <MovieLists />
    </div>
  );
}

export default App;
