import { Search } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import "./Header.scss";

export default function Header() {
  return (
    <header className="header">
      <Link to="/">
        <div className="header__logo">MOVIES</div>
      </Link>
      <nav className="header__nav">
        <ul className="header__nav-list">
          <li className="header__nav-item">
            <NavLink to="/movies/trending" className="header__nav-link">
              Trending
            </NavLink>
          </li>
          <li className="header__nav-item">
            <NavLink to="/movies/recent" className="header__nav-link">
              Recent
            </NavLink>
          </li>
          <li className="header__nav-item">
            <NavLink to="/movies/popular" className="header__nav-link">
              Popular
            </NavLink>
          </li>
          <li className="header__nav-item">
            <NavLink to="/movies/top-rated" className="header__nav-link">
              Top
            </NavLink>
          </li>
          <li className="header__nav-item">
            <NavLink to="/movies/upcoming" className="header__nav-link">
              Upcoming
            </NavLink>
          </li>
        </ul>
      </nav>
      <Link to="/search">
        <Search className="header__icon" />
      </Link>
    </header>
  );
}
