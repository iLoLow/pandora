import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logoPandora.png";
import "../styles/Header.css";
import MenuMobile from "./MenuMobile";
import ProfilMenu from "./ProfilMenu";
import Toggle from "./Toggle";
import { useSelector } from "react-redux";

function Header() {
  const user = useSelector((state) => state.user);

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
        {!user && (
          <NavLink className={({ isActive }) => (isActive ? "link link-active" : "link")} end to="/identification">
            S'identifier
          </NavLink>
        )}
        <Toggle />
        <ProfilMenu user={user} />
      </nav>
      <MenuMobile />
    </header>
  );
}

export default Header;