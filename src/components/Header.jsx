import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logoPandora.png";
import "../styles/Header.css";
import MenuMobile from "./MenuMobile";

function Header() {
  return (
    <header className="header">
      <Link to="/" aria-label="Accueil">
        <img src={logo} className="logo-pandora" alt="logo pandora" />
      </Link>
      <nav className="navDesktop">
        <NavLink className={({ isActive }) => (isActive ? "link link-active" : "link")} end to="/">
          Accueil
        </NavLink>
        <NavLink className={({ isActive }) => (isActive ? "link link-active" : "link")} end to="/annonces">
          Annonces
        </NavLink>
        <NavLink className={({ isActive }) => (isActive ? "link link-active" : "link")} end to="/rejoindre">
          Nous rejoindre
        </NavLink>
        <NavLink className={({ isActive }) => (isActive ? "link link-active" : "link")} end to="/boutique">
          Boutique
        </NavLink>
        <NavLink className={({ isActive }) => (isActive ? "link link-active" : "link")} end to="/identification">
          S'identifier
        </NavLink>
      </nav>
      <MenuMobile />
    </header>
  );
}

export default Header;
