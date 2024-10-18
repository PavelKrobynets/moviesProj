import { Search } from "lucide-react";
import "./Header.scss";

export default function Header() {
  return (
    <header className="header">
      <div className="header__logo">MOVIES</div>
      <nav className="header__nav">
        <ul className="header__nav-list">
          <li className="header__nav-item">Trending</li>
          <li className="header__nav-item">Upcoming</li>
          <li className="header__nav-item">Popular</li>
        </ul>
      </nav>
      <button className="header__btn">
        <Search />
      </button>
    </header>
  );
}
