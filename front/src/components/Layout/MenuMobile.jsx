import { NavLink } from "react-router-dom";
import { useState } from "react";
import Toggle from "../Others/Toggle";
import "../../styles/layout/MenuMobile.css";
import ProfilMenu from "./ProfilMenu";
import { useSelector } from "react-redux";

function MenuMobile() {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.user);

  return (
    <>
      <div onClick={() => setIsOpen(!isOpen)} className={isOpen ? "MenuBurger open" : "MenuBurger"}>
        <span className="Burger"></span>
      </div>
      {isOpen && (
        <nav className="navMobile">
          <ProfilMenu user={user} menuOpen={isOpen} setMenuOpen={() => setIsOpen(!isOpen)} />
          <NavLink aria-label="Accueil" onClick={() => setIsOpen(false)} className={({ isActive }) => (isActive ? "link link-active" : "link")} end to="/">
            <span className="NavmobileFlex">
              <span className="NavMobileSvgHome">
                <svg fill="#0d7f90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M416 174.74V48h-80v58.45L256 32 0 272h64v208h144V320h96v160h144V272h64l-96-97.26z" />
                </svg>
              </span>
              Accueil
            </span>
          </NavLink>
          <NavLink aria-label="Annonces" onClick={() => setIsOpen(false)} className={({ isActive }) => (isActive ? "link link-active" : "link")} end to="/annonces">
            <span className="NavmobileFlex">
              <span className="NavMobileSvgHome">
                <svg fill="#0d7f90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M460 240H320a48 48 0 01-48-48V52a4 4 0 00-4-4h-53.25a65.42 65.42 0 00-6.5-9.81C196.72 23.88 179.59 16 160 16c-37.68 0-64 29.61-64 72v144c0 25 20.34 40 40 40a39.57 39.57 0 0040-40V80a16 16 0 00-32 0v152a7.75 7.75 0 01-8 8c-2.23 0-8-1.44-8-8V88c0-19.34 8.41-40 32-40 29.69 0 32 30.15 32 39.38v138.75c0 17.45-5.47 33.23-15.41 44.46C166.5 282 152.47 288 136 288s-30.5-6-40.59-17.41C85.47 259.36 80 243.58 80 226.13V144a16 16 0 00-32 0v82.13c0 51.51 33.19 89.63 80 93.53V432a64 64 0 0064 64h208a64 64 0 0064-64V244a4 4 0 00-4-4z" />
                  <path d="M320 208h129.81a2 2 0 001.41-3.41L307.41 60.78a2 2 0 00-3.41 1.41V192a16 16 0 0016 16z" />
                </svg>
              </span>
              Annonces
            </span>
          </NavLink>
          <NavLink aria-label="Notre equipe" onClick={() => setIsOpen(false)} className={({ isActive }) => (isActive ? "link link-active" : "link")} end to="/equipepandora">
            <span className="NavmobileFlex">
              <span className="NavMobileSvgHome">
                <svg fill="#0d7f90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M336 256c-20.56 0-40.44-9.18-56-25.84-15.13-16.25-24.37-37.92-26-61-1.74-24.62 5.77-47.26 21.14-63.76S312 80 336 80c23.83 0 45.38 9.06 60.7 25.52 15.47 16.62 23 39.22 21.26 63.63-1.67 23.11-10.9 44.77-26 61C376.44 246.82 356.57 256 336 256zm66-88zM467.83 432H204.18a27.71 27.71 0 01-22-10.67 30.22 30.22 0 01-5.26-25.79c8.42-33.81 29.28-61.85 60.32-81.08C264.79 297.4 299.86 288 336 288c36.85 0 71 9 98.71 26.05 31.11 19.13 52 47.33 60.38 81.55a30.27 30.27 0 01-5.32 25.78A27.68 27.68 0 01467.83 432zM147 260c-35.19 0-66.13-32.72-69-72.93-1.42-20.6 5-39.65 18-53.62 12.86-13.83 31-21.45 51-21.45s38 7.66 50.93 21.57c13.1 14.08 19.5 33.09 18 53.52-2.87 40.2-33.8 72.91-68.93 72.91zM212.66 291.45c-17.59-8.6-40.42-12.9-65.65-12.9-29.46 0-58.07 7.68-80.57 21.62-25.51 15.83-42.67 38.88-49.6 66.71a27.39 27.39 0 004.79 23.36A25.32 25.32 0 0041.72 400h111a8 8 0 007.87-6.57c.11-.63.25-1.26.41-1.88 8.48-34.06 28.35-62.84 57.71-83.82a8 8 0 00-.63-13.39c-1.57-.92-3.37-1.89-5.42-2.89z" />
                </svg>
              </span>
              Notre Equipe
            </span>
          </NavLink>
          <NavLink aria-label="Nous Rejoindre" onClick={() => setIsOpen(false)} className={({ isActive }) => (isActive ? "link link-active" : "link")} end to="/rejoindre">
            <span className="NavmobileFlex">
              <span className="NavMobileSvgHome">
                <svg fill="#0d7f90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M288 256c52.79 0 99.43-49.71 104-110.82 2.27-30.7-7.36-59.33-27.12-80.6C345.33 43.57 318 32 288 32c-30.24 0-57.59 11.5-77 32.38-19.63 21.11-29.2 49.8-27 80.78C188.49 206.28 235.12 256 288 256zM495.38 439.76c-8.44-46.82-34.79-86.15-76.19-113.75C382.42 301.5 335.83 288 288 288s-94.42 13.5-131.19 38c-41.4 27.6-67.75 66.93-76.19 113.75-1.93 10.73.69 21.34 7.19 29.11A30.94 30.94 0 00112 480h352a30.94 30.94 0 0024.21-11.13c6.48-7.77 9.1-18.38 7.17-29.11zM104 288v-40h40a16 16 0 000-32h-40v-40a16 16 0 00-32 0v40H32a16 16 0 000 32h40v40a16 16 0 0032 0z" />
                </svg>
              </span>
              Nous rejoindre
            </span>
          </NavLink>
          <NavLink aria-label="Boutique" onClick={() => setIsOpen(false)} className={({ isActive }) => (isActive ? "link link-active" : "link")} end to="/boutique">
            <span className="NavmobileFlex">
              <span className="NavMobileSvgHome">
                <svg fill="#0d7f90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <circle cx="176" cy="416" r="32" />
                  <circle cx="400" cy="416" r="32" />
                  <path d="M456.8 120.78a23.92 23.92 0 00-18.56-8.78H133.89l-6.13-34.78A16 16 0 00112 64H48a16 16 0 000 32h50.58l45.66 258.78A16 16 0 00160 368h256a16 16 0 000-32H173.42l-5.64-32h241.66A24.07 24.07 0 00433 284.71l28.8-144a24 24 0 00-5-19.93z" />
                </svg>
              </span>
              Boutique
            </span>
          </NavLink>
          <Toggle />
        </nav>
      )}
    </>
  );
}

export default MenuMobile;
