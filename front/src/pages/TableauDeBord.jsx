import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "../styles/TableauDeBord.css";
import { Routes, Route } from "react-router-dom";
import ProfilAdmin from "./tableaudebord/ProfilAdmin";
import AnnoncesAdmin from "./tableaudebord/AnnoncesAdmin";
import BoutiqueAdmin from "./tableaudebord/BoutiqueAdmin";

function TableauDeBord() {
  const [isOpen, setIsOpen] = useState(false);

  const getUser = async (userId) => {
    await fetch("api/user/" + { userId }, {
      method: "GET",
      body: userId,
    });
  };
  return (
    <div className="tableauDeBordWrapper">
      <aside className={isOpen ? "tableauDeBordAside" : "tableauDeBordAside tableauDeBordAsideSmall"}>
        <div className="tableauDeBordAsideHeader">
          <div className={isOpen ? "tableauDeBordAsideBtn" : "tableauDeBordAsideBtn tableauDeBordAsideBtnReverse"} onClick={() => setIsOpen(!isOpen)}>
            <span className="tableauDeBordIcone">
              <svg stroke="#0d7f90" xmlns="http://www.w3.org/2000/svg" className="tableauDeBordIcone" viewBox="0 0 512 512">
                <path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="48" d="M244 400L100 256l144-144M120 256h292" />
              </svg>
            </span>
          </div>
        </div>
        <NavLink to="/tableaudebord/profil">
          <span className="tableauDeBordIcone">
            <svg fill="#0d7f90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm-50.22 116.82C218.45 151.39 236.28 144 256 144s37.39 7.44 50.11 20.94c12.89 13.68 19.16 32.06 17.68 51.82C320.83 256 290.43 288 256 288s-64.89-32-67.79-71.25c-1.47-19.92 4.79-38.36 17.57-51.93zM256 432a175.49 175.49 0 01-126-53.22 122.91 122.91 0 0135.14-33.44C190.63 329 222.89 320 256 320s65.37 9 90.83 25.34A122.87 122.87 0 01382 378.78 175.45 175.45 0 01256 432z" />
            </svg>
          </span>
          <span>profil</span>
        </NavLink>
        <NavLink to="/tableaudebord/annonces">
          <span className="tableauDeBordIcone">
            <svg fill="#0d7f90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M460 240H320a48 48 0 01-48-48V52a4 4 0 00-4-4h-53.25a65.42 65.42 0 00-6.5-9.81C196.72 23.88 179.59 16 160 16c-37.68 0-64 29.61-64 72v144c0 25 20.34 40 40 40a39.57 39.57 0 0040-40V80a16 16 0 00-32 0v152a7.75 7.75 0 01-8 8c-2.23 0-8-1.44-8-8V88c0-19.34 8.41-40 32-40 29.69 0 32 30.15 32 39.38v138.75c0 17.45-5.47 33.23-15.41 44.46C166.5 282 152.47 288 136 288s-30.5-6-40.59-17.41C85.47 259.36 80 243.58 80 226.13V144a16 16 0 00-32 0v82.13c0 51.51 33.19 89.63 80 93.53V432a64 64 0 0064 64h208a64 64 0 0064-64V244a4 4 0 00-4-4z" />
              <path d="M320 208h129.81a2 2 0 001.41-3.41L307.41 60.78a2 2 0 00-3.41 1.41V192a16 16 0 0016 16z" />
            </svg>
          </span>
          <span>annonces</span>
        </NavLink>
        <NavLink to="/tableaudebord/boutique">
          <span className="tableauDeBordIcone">
            <svg fill="#0d7f90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <circle cx="176" cy="416" r="32" />
              <circle cx="400" cy="416" r="32" />
              <path d="M456.8 120.78a23.92 23.92 0 00-18.56-8.78H133.89l-6.13-34.78A16 16 0 00112 64H48a16 16 0 000 32h50.58l45.66 258.78A16 16 0 00160 368h256a16 16 0 000-32H173.42l-5.64-32h241.66A24.07 24.07 0 00433 284.71l28.8-144a24 24 0 00-5-19.93z" />
            </svg>
          </span>
          <span>boutique</span>
        </NavLink>
      </aside>
      {/* <span style={isOpen ? { width: "200px", transition: "width 250ms ease-in-out" } : { width: "60px" }}></span> */}
      <section className={isOpen ? "tableauDeBordBody" : "tableauDeBordBody  tableauDeBordBodySmall"}>
        <Routes>
          <Route path="/profil" element={<ProfilAdmin />} />
          <Route path="/annonces" element={<AnnoncesAdmin />} />
          <Route path="/boutique" element={<BoutiqueAdmin />} />
        </Routes>
      </section>
    </div>
  );
}

export default TableauDeBord;
