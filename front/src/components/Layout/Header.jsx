import { Link, NavLink } from "react-router-dom";
import "../../styles/layout/Header.css";
import MenuMobile from "./MenuMobile";
import ProfilMenu from "./ProfilMenu";
import Toggle from "../Others/Toggle";
import { useSelector } from "react-redux";

function Header() {
  const user = useSelector((state) => state.user);

  return (
    <header className="header">
      <Link to="/" aria-label="Accueil">
        <div className="logo-pandora">
          <img src="/logoPandora.png" alt="logo pandora" />
        </div>
      </Link>
      <nav className="navDesktop">
        <NavLink aria-label="Accueil" className={({ isActive }) => (isActive ? "link link-active" : "link")} end to="/">
          Accueil
        </NavLink>
        <NavLink aria-label="Annonces" className={({ isActive }) => (isActive ? "link link-active" : "link")} end to="/annonces">
          Annonces
        </NavLink>
        <NavLink aria-label="Notre equipe" className={({ isActive }) => (isActive ? "link link-active" : "link")} end to="/equipepandora">
          Notre Equipe
        </NavLink>
        <NavLink aria-label="Nous rejoindre" className={({ isActive }) => (isActive ? "link link-active" : "link")} end to="/rejoindre">
          Nous rejoindre
        </NavLink>
        <NavLink aria-label="Boutique" className={({ isActive }) => (isActive ? "link link-active" : "link")} end to="/boutique">
          Boutique
        </NavLink>
        <Toggle />
        <ProfilMenu user={user} />
      </nav>
      <MenuMobile />
    </header>
  );
}

export default Header;
