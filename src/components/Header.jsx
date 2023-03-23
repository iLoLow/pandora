import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logoPandora.png";
import "../styles/Header.css";

function Header() {
  return (
    <header className="header">
      <Link to="/" aria-label="Accueil">
        <img src={logo} className="logo-pandora" alt="logo pandora" />
      </Link>
      <nav>
        <NavLink className={({ isActive }) => (isActive ? "link link-active" : "link")} end to="/">
          Accueil
        </NavLink>
        <NavLink className={({ isActive }) => (isActive ? "link link-active" : "link")} end to="/boutique">
          Boutique
        </NavLink>
        <NavLink className={({ isActive }) => (isActive ? "link link-active" : "link")} end to="/identification">
          S'identifier
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
