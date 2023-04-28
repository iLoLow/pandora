import { NavLink } from "react-router-dom";
import "../styles/pages/Erreur.css";
import logo from "../assets/maintenance.webp";

function Erreur() {
  document.title = "Erreur";
  return (
    <section className="erreur">
      <img src={logo} alt="logo de maintenance" />
      <h1>Eh, pelo, t'es perdu. La page que tu cherches n'existe pas.</h1>
      <p>Si c'est notre erreur, contacte-nous. Sinon, retourne à la case départ et essaie autre chose, mec. Bonne chance.</p>
      <NavLink className={({ isActive }) => (isActive ? "link link-active" : "link")} to="/" aria-label="Accueil">
        Retourner à l'accueil
      </NavLink>
    </section>
  );
}
export default Erreur;
