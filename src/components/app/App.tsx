import Header from "../header/Header";
import {
  MainPage,
  SearchPage,
  MoviePage,
  Page404,
  MoviesPage,
} from "../../pages/index";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.scss";

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/movies/:type" element={<MoviesPage />} />
          <Route path="/movie/:id" element={<MoviePage />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
