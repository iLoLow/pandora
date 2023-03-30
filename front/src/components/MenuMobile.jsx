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
                <svg fill="#72d2e1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M416 174.74V48h-80v58.45L256 32 0 272h64v208h144V320h96v160h144V272h64l-96-97.26z" />
                </svg>
              </span>
              Accueil
            </span>
          </NavLink>
          <NavLink onClick={() => setIsOpen(false)} className={({ isActive }) => (isActive ? "link link-active" : "link")} end to="/annonces">
            <span className="NavmobileFlex">
              <span className="NavMobileSvgHome">
                <svg fill="#72d2e1" xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512">
                  <title>Code Slash</title>
                  <path d="M160 389a20.91 20.91 0 01-13.82-5.2l-128-112a21 21 0 010-31.6l128-112a21 21 0 0127.66 31.61L63.89 256l109.94 96.19A21 21 0 01160 389zM352 389a21 21 0 01-13.84-36.81L448.11 256l-109.94-96.19a21 21 0 0127.66-31.61l128 112a21 21 0 010 31.6l-128 112A20.89 20.89 0 01352 389zM208 437a21 21 0 01-20.12-27l96-320a21 21 0 1140.23 12l-96 320A21 21 0 01208 437z" />
                </svg>
              </span>
              Annonces
            </span>
          </NavLink>
          <NavLink onClick={() => setIsOpen(false)} className={({ isActive }) => (isActive ? "link link-active" : "link")} end to="/rejoindre">
            <span className="NavmobileFlex">
              <span className="NavMobileSvgHome">
                <svg fill="#72d2e1" xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512">
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
                <svg fill="#72d2e1" xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512">
                  <title>Person Circle</title>
                  <path d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm2 96a72 72 0 11-72 72 72 72 0 0172-72zm-2 288a175.55 175.55 0 01-129.18-56.6C135.66 329.62 215.06 320 256 320s120.34 9.62 129.18 55.39A175.52 175.52 0 01256 432z" />
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
