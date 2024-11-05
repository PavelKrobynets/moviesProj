import Header from "../header/Header";
import MainPage from "../../pages/MainPage";
import SearchPage from "../../pages/SearchPage";
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
