import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import "./Header.scss";

export default function Header() {
  return (
    <header className="header">
      <Link to="/">
        <div className="header__logo">MOVIES</div>
      </Link>
      <nav className="header__nav">
        <ul className="header__nav-list">
          <li className="header__nav-item">Trending</li>
          <li className="header__nav-item">Upcoming</li>
          <li className="header__nav-item">Popular</li>
        </ul>
      </nav>
      <Link to="/search">
        <Search className="header__icon" />
      </Link>
    </header>
  );
}
