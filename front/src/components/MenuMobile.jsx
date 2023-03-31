import { NavLink } from "react-router-dom";
import { useState } from "react";
import Toggle from "./Toggle";
import "../styles/MenuMobile.css";
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
        <nav className="NavMobile">
          <ProfilMenu user={user} />
          <NavLink onClick={() => setIsOpen(false)} className={({ isActive }) => (isActive ? "link link-active" : "link")} end to="/">
            <span className="NavmobileFlex">
              <span className="NavMobileSvgHome">
                <svg fill="#0d7f90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M416 174.74V48h-80v58.45L256 32 0 272h64v208h144V320h96v160h144V272h64l-96-97.26z" />
                </svg>
              </span>
              Accueil
            </span>
          </NavLink>
          <NavLink onClick={() => setIsOpen(false)} className={({ isActive }) => (isActive ? "link link-active" : "link")} end to="/annonces">
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
          <NavLink onClick={() => setIsOpen(false)} className={({ isActive }) => (isActive ? "link link-active" : "link")} end to="/rejoindre">
            <span className="NavmobileFlex">
              <span className="NavMobileSvgHome">
                <svg fill="#0d7f90" xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512">
                  <title>Person Circle</title>
                  <path d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm2 96a72 72 0 11-72 72 72 72 0 0172-72zm-2 288a175.55 175.55 0 01-129.18-56.6C135.66 329.62 215.06 320 256 320s120.34 9.62 129.18 55.39A175.52 175.52 0 01256 432z" />
                </svg>
              </span>
              Nous rejoindre
            </span>
          </NavLink>
          <NavLink onClick={() => setIsOpen(false)} className={({ isActive }) => (isActive ? "link link-active" : "link")} end to="/boutique">
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
