import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../styles/TableauDeBord.css";
import { Routes, Route } from "react-router-dom";
import ProfilAdmin from "./tableaudebord/ProfilAdmin";
import AnnoncesAdmin from "./tableaudebord/AnnoncesAdmin";
import BoutiqueAdmin from "./tableaudebord/BoutiqueAdmin";
import AccueilAdmin from "./tableaudebord/AccueilAdmin";
import GalerieAdmin from "./tableaudebord/GalerieAdmin";
import AdminUsers from "./tableaudebord/admin/AdminUsers";
import AdminAnnonces from "./tableaudebord/admin/AdminAnnonces";
import { useSelector } from "react-redux";

function TableauDeBord() {
  document.title = "Tableau de bord";

  const { is_admin } = useSelector((state) => state.user);

  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
        {/* Gestion utilisateur */}
        <h3 className="tableauDeBordCategorie">User</h3>
        <span className="tableauDeBordSeparateur"></span>
        <div className="tableauDeBordLinks">
          <NavLink to="/tableaudebord">
            <span className="tableauDeBordIcone">
              <svg fill="#0d7f90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M256 56C145.72 56 56 145.72 56 256s89.72 200 200 200 200-89.72 200-200S366.28 56 256 56zm0 82a26 26 0 11-26 26 26 26 0 0126-26zm48 226h-88a16 16 0 010-32h28v-88h-16a16 16 0 010-32h32a16 16 0 0116 16v104h28a16 16 0 010 32z" />
              </svg>
            </span>
            <span>infos</span>
          </NavLink>
          <NavLink to="/tableaudebord/profil">
            <span className="tableauDeBordIcone">
              <svg fill="#0d7f90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M332.64 64.58C313.18 43.57 286 32 256 32c-30.16 0-57.43 11.5-76.8 32.38-19.58 21.11-29.12 49.8-26.88 80.78C156.76 206.28 203.27 256 256 256s99.16-49.71 103.67-110.82c2.27-30.7-7.33-59.33-27.03-80.6zM432 480H80a31 31 0 01-24.2-11.13c-6.5-7.77-9.12-18.38-7.18-29.11C57.06 392.94 83.4 353.61 124.8 326c36.78-24.51 83.37-38 131.2-38s94.42 13.5 131.2 38c41.4 27.6 67.74 66.93 76.18 113.75 1.94 10.73-.68 21.34-7.18 29.11A31 31 0 01432 480z" />
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
        </div>

        {!!is_admin && (
          <>
            <h3 className="tableauDeBordCategorie">Admin</h3>
            <span className="tableauDeBordSeparateur"></span>
            <div className="tableauDeBordLinks">
              <NavLink to="/tableaudebord/admin/infos">
                <span className="tableauDeBordIcone">
                  <svg fill="#0d7f90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M256 56C145.72 56 56 145.72 56 256s89.72 200 200 200 200-89.72 200-200S366.28 56 256 56zm0 82a26 26 0 11-26 26 26 26 0 0126-26zm48 226h-88a16 16 0 010-32h28v-88h-16a16 16 0 010-32h32a16 16 0 0116 16v104h28a16 16 0 010 32z" />
                  </svg>
                </span>
                <span>infos</span>
              </NavLink>
              <NavLink to="/tableaudebord/admin/users">
                <span className="tableauDeBordIcone">
                  <svg fill="#0d7f90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M336 256c-20.56 0-40.44-9.18-56-25.84-15.13-16.25-24.37-37.92-26-61-1.74-24.62 5.77-47.26 21.14-63.76S312 80 336 80c23.83 0 45.38 9.06 60.7 25.52 15.47 16.62 23 39.22 21.26 63.63-1.67 23.11-10.9 44.77-26 61C376.44 246.82 356.57 256 336 256zm66-88zM467.83 432H204.18a27.71 27.71 0 01-22-10.67 30.22 30.22 0 01-5.26-25.79c8.42-33.81 29.28-61.85 60.32-81.08C264.79 297.4 299.86 288 336 288c36.85 0 71 9 98.71 26.05 31.11 19.13 52 47.33 60.38 81.55a30.27 30.27 0 01-5.32 25.78A27.68 27.68 0 01467.83 432zM147 260c-35.19 0-66.13-32.72-69-72.93-1.42-20.6 5-39.65 18-53.62 12.86-13.83 31-21.45 51-21.45s38 7.66 50.93 21.57c13.1 14.08 19.5 33.09 18 53.52-2.87 40.2-33.8 72.91-68.93 72.91zM212.66 291.45c-17.59-8.6-40.42-12.9-65.65-12.9-29.46 0-58.07 7.68-80.57 21.62-25.51 15.83-42.67 38.88-49.6 66.71a27.39 27.39 0 004.79 23.36A25.32 25.32 0 0041.72 400h111a8 8 0 007.87-6.57c.11-.63.25-1.26.41-1.88 8.48-34.06 28.35-62.84 57.71-83.82a8 8 0 00-.63-13.39c-1.57-.92-3.37-1.89-5.42-2.89z" />
                  </svg>
                </span>
                <span>Utilisateurs</span>
              </NavLink>
              <NavLink to="/tableaudebord/admin/annonces">
                <span className="tableauDeBordIcone">
                  <svg fill="#0d7f90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M298.39 248a4 4 0 002.86-6.8l-78.4-79.72a4 4 0 00-6.85 2.81V236a12 12 0 0012 12z" />
                    <path d="M197 267a43.67 43.67 0 01-13-31v-92h-72a64.19 64.19 0 00-64 64v224a64 64 0 0064 64h144a64 64 0 0064-64V280h-92a43.61 43.61 0 01-31-13zM372 120h70.39a4 4 0 002.86-6.8l-78.4-79.72a4 4 0 00-6.85 2.81V108a12 12 0 0012 12z" />
                    <path d="M372 152a44.34 44.34 0 01-44-44V16H220a60.07 60.07 0 00-60 60v36h42.12A40.81 40.81 0 01231 124.14l109.16 111a41.11 41.11 0 0111.83 29V400h53.05c32.51 0 58.95-26.92 58.95-60V152z" />
                  </svg>
                </span>
                <span>Annonces</span>
              </NavLink>
              <NavLink to="/tableaudebord/admin/galerie">
                <span className="tableauDeBordIcone">
                  <svg fill="#0d7f90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M450.29 112H142c-34 0-62 27.51-62 61.33v245.34c0 33.82 28 61.33 62 61.33h308c34 0 62-26.18 62-60V173.33c0-33.82-27.68-61.33-61.71-61.33zm-77.15 61.34a46 46 0 11-46.28 46 46.19 46.19 0 0146.28-46.01zm-231.55 276c-17 0-29.86-13.75-29.86-30.66v-64.83l90.46-80.79a46.54 46.54 0 0163.44 1.83L328.27 337l-113 112.33zM480 418.67a30.67 30.67 0 01-30.71 30.66H259L376.08 333a46.24 46.24 0 0159.44-.16L480 370.59z" />
                    <path d="M384 32H64A64 64 0 000 96v256a64.11 64.11 0 0048 62V152a72 72 0 0172-72h326a64.11 64.11 0 00-62-48z" />
                  </svg>
                </span>
                <span>Galerie</span>
              </NavLink>
              <NavLink to="/tableaudebord/admin/services">
                <span className="tableauDeBordIcone">
                  <svg fill="#0d7f90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path
                      d="M212.2,453l-15.5-15.5c-23.2,23-43.1,30.6-60.9,30.6c-10.1,0-20.1-2.5-30.4-7.6c-10.3-5.1-20.8-12.9-31-23.1
		c-10.2-10.2-18-20.7-23.1-31c-5.1-10.3-7.6-20.3-7.6-30.4c0.1-17.8,7.7-37.8,30.6-60.9c54.7-54.7,65.6-65.6,65.7-65.7l-15.5-15.5
		l-15.5,15.5l153.3,153.3l15.5-15.5l-15.5-15.5c-0.1,0.1-10.9,10.9-65.7,65.7L212.2,453l15.5,15.5c54.7-54.7,65.6-65.6,65.7-65.7
		l15.5-15.5L124.6,203.1l-15.5,15.5c-0.1,0.1-10.9,10.9-65.7,65.7C14.7,312.9-0.1,344.6,0,376.2c0,17.5,4.5,34.4,12.1,49.8
		c7.7,15.5,18.4,29.6,31.3,42.5c12.9,12.9,27,23.7,42.5,31.3c15.4,7.7,32.3,12.2,49.8,12.1c31.6,0.1,63.4-14.7,91.9-43.5L212.2,453z
		 M299.8,59l15.5,15.5c23.2-23,43.1-30.6,60.9-30.6c10.1,0,20.1,2.5,30.4,7.6c10.3,5.1,20.8,12.9,31,23.1l0,0
		c10.2,10.2,18,20.7,23.1,31c5.1,10.3,7.6,20.3,7.6,30.4c-0.1,17.8-7.7,37.8-30.6,61c-27.4,27.4-43.8,43.8-53.4,53.4
		c-9.6,9.6-12.3,12.3-12.3,12.3l15.5,15.5l15.5-15.5L249.6,109.2l-15.5,15.5l15.5,15.5c0,0,11-11,65.7-65.7l0,0L299.8,59l-15.5-15.5
		c-27.4,27.4-43.8,43.8-53.4,53.4c-9.6,9.6-12.3,12.3-12.3,12.3l-15.5,15.5l184.2,184.2l15.5-15.4c0,0,11-11,65.7-65.7
		c28.7-28.6,43.5-60.3,43.5-91.9c0-17.5-4.5-34.4-12.1-49.8c-7.7-15.5-18.4-29.6-31.3-42.5l0,0c-12.9-12.9-27-23.7-42.5-31.3
		C410.6,4.5,393.7,0,376.2,0c-31.6-0.1-63.4,14.7-91.9,43.5l0,0L299.8,59z M234.1,212.2l-15.5-15.5l-54.7,54.7l31,31l54.7-54.7
		l-31-31L234.1,212.2l-15.5-15.5l-54.7,54.7l31,31l54.7-54.7l-31-31L234.1,212.2z M299.8,277.9l-15.5-15.5l-54.7,54.7l31,31
		l54.7-54.7l-31-31L299.8,277.9l-15.5-15.5l-54.7,54.7l31,31l54.7-54.7l-31-31L299.8,277.9z"
                    />
                  </svg>
                </span>
                <span>services</span>
              </NavLink>
              <NavLink to="/tableaudebord/admin/boutique">
                <span className="tableauDeBordIcone">
                  <svg fill="#0d7f90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <circle cx="176" cy="416" r="32" />
                    <circle cx="400" cy="416" r="32" />
                    <path d="M456.8 120.78a23.92 23.92 0 00-18.56-8.78H133.89l-6.13-34.78A16 16 0 00112 64H48a16 16 0 000 32h50.58l45.66 258.78A16 16 0 00160 368h256a16 16 0 000-32H173.42l-5.64-32h241.66A24.07 24.07 0 00433 284.71l28.8-144a24 24 0 00-5-19.93z" />
                  </svg>
                </span>
                <span>boutique</span>
              </NavLink>
            </div>
          </>
        )}
      </aside>
      <section className={isOpen ? "tableauDeBordBody" : "tableauDeBordBody  tableauDeBordBodySmall"}>
        <Routes>
          <Route path="/" element={<AccueilAdmin />} />
          <Route path="/profil" element={<ProfilAdmin />} />
          <Route path="/annonces" element={<AnnoncesAdmin />} />
          <Route path="/admin/infos" element={<ProfilAdmin />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/annonces" element={<AdminAnnonces />} />
          <Route path="/admin/galerie" element={<GalerieAdmin />} />
          <Route path="/admin/services" element={<BoutiqueAdmin />} />
          <Route path="/admin/boutique" element={<BoutiqueAdmin />} />
        </Routes>
      </section>
    </div>
  );
}

export default TableauDeBord;
