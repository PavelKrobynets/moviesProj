import Header from "../header/Header";
import MainPage from "../../pages/MainPage";
// import SearchPage from "../../pages/SearchPage";
import "./App.scss";

function App() {
  return (
    <div className="app">
      <Header />
      <MainPage />
      {/* <SearchPage/> */}
    </div>
  );
}

export default App;
