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
          <img src="/logoPandora.webp" alt="logo pandora" />
        </div>
      </Link>
      <nav className="navDesktop">
        <NavLink aria-label="Accueil" className={({ isActive }) => (isActive ? "link link-active" : "link")} end to="/">
          <div className="NavDesktopsvgHome">
            <svg fill="#0d7f90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M416 174.74V48h-80v58.45L256 32 0 272h64v208h144V320h96v160h144V272h64l-96-97.26z" />
            </svg>
          </div>
          Accueil
        </NavLink>

        <NavLink aria-label="Annonces" className={({ isActive }) => (isActive ? "link link-active" : "link")} end to="/annonces">
          <span className="NavDesktopsvgHome">
            <svg fill="#0d7f90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M48 176v.66a17.38 17.38 0 01-4.2 11.23v.05C38.4 194.32 32 205.74 32 224c0 16.55 5.3 28.23 11.68 35.91A19 19 0 0148 272a32 32 0 0032 32h8a8 8 0 008-8V152a8 8 0 00-8-8h-8a32 32 0 00-32 32zM452.18 186.55l-.93-.17a4 4 0 01-3.25-3.93V62c0-12.64-8.39-24-20.89-28.32-11.92-4.11-24.34-.76-31.68 8.53a431.18 431.18 0 01-51.31 51.69c-23.63 20-46.24 34.25-67 42.31a8 8 0 00-5.15 7.47V299a16 16 0 009.69 14.69c19.34 8.29 40.24 21.83 62 40.28a433.74 433.74 0 0151.68 52.16 26.22 26.22 0 0021.1 9.87 33.07 33.07 0 0010.44-1.74C439.71 410 448 399.05 448 386.4V265.53a4 4 0 013.33-3.94l.85-.14C461.8 258.84 480 247.67 480 224s-18.2-34.84-27.82-37.45zM240 320V152a8 8 0 00-8-8h-96a8 8 0 00-8 8v304a24 24 0 0024 24h52.45a32.66 32.66 0 0025.93-12.45 31.65 31.65 0 005.21-29.05c-1.62-5.18-3.63-11-5.77-17.19-7.91-22.9-18.34-37.07-21.12-69.32A32 32 0 00240 320z" />
            </svg>
          </span>
          Annonces
        </NavLink>

        <NavLink aria-label="Notre equipe" className={({ isActive }) => (isActive ? "link link-active" : "link")} end to="/equipepandora">
          <span className="NavDesktopsvgHome">
            <svg fill="#0d7f90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M336 256c-20.56 0-40.44-9.18-56-25.84-15.13-16.25-24.37-37.92-26-61-1.74-24.62 5.77-47.26 21.14-63.76S312 80 336 80c23.83 0 45.38 9.06 60.7 25.52 15.47 16.62 23 39.22 21.26 63.63-1.67 23.11-10.9 44.77-26 61C376.44 246.82 356.57 256 336 256zm66-88zM467.83 432H204.18a27.71 27.71 0 01-22-10.67 30.22 30.22 0 01-5.26-25.79c8.42-33.81 29.28-61.85 60.32-81.08C264.79 297.4 299.86 288 336 288c36.85 0 71 9 98.71 26.05 31.11 19.13 52 47.33 60.38 81.55a30.27 30.27 0 01-5.32 25.78A27.68 27.68 0 01467.83 432zM147 260c-35.19 0-66.13-32.72-69-72.93-1.42-20.6 5-39.65 18-53.62 12.86-13.83 31-21.45 51-21.45s38 7.66 50.93 21.57c13.1 14.08 19.5 33.09 18 53.52-2.87 40.2-33.8 72.91-68.93 72.91zM212.66 291.45c-17.59-8.6-40.42-12.9-65.65-12.9-29.46 0-58.07 7.68-80.57 21.62-25.51 15.83-42.67 38.88-49.6 66.71a27.39 27.39 0 004.79 23.36A25.32 25.32 0 0041.72 400h111a8 8 0 007.87-6.57c.11-.63.25-1.26.41-1.88 8.48-34.06 28.35-62.84 57.71-83.82a8 8 0 00-.63-13.39c-1.57-.92-3.37-1.89-5.42-2.89z" />
            </svg>
          </span>
          Notre Equipe
        </NavLink>

        <NavLink aria-label="Nous rejoindre" className={({ isActive }) => (isActive ? "link link-active" : "link")} end to="/rejoindre">
          <span className="NavDesktopsvgHome">
            <svg fill="#0d7f90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
            </svg>
          </span>
          Nous rejoindre
        </NavLink>

        <NavLink aria-label="Boutique" className={({ isActive }) => (isActive ? "link link-active" : "link")} end to="/boutique">
          <span className="NavDesktopsvgHome">
            <svg fill="#0d7f90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <circle cx="176" cy="416" r="32" />
              <circle cx="400" cy="416" r="32" />
              <path d="M456.8 120.78a23.92 23.92 0 00-18.56-8.78H133.89l-6.13-34.78A16 16 0 00112 64H48a16 16 0 000 32h50.58l45.66 258.78A16 16 0 00160 368h256a16 16 0 000-32H173.42l-5.64-32h241.66A24.07 24.07 0 00433 284.71l28.8-144a24 24 0 00-5-19.93z" />
            </svg>
          </span>
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
