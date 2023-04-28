import { NavLink } from "react-router-dom";
import "../styles/pages/BoutiqueClose.css";
import BarreReseaux from "../components/Others/BarreReseaux";
import logo from "../assets/maintenance.webp";

function BoutiqueClose() {
  document.title = "La boutique est fermée";
  return (
    <section className="maintenance">
      <img src={logo} alt="logo de maintenance" />
      <h1>La boutique est actuellement fermée et sera de nouveau disponible prochainement.</h1>
      <p>Si le problème persiste, contactez-nous sur Discord.</p>
      <BarreReseaux />
      <NavLink className={({ isActive }) => (isActive ? "link link-active" : "link")} to="/" aria-label="Accueil">
        <p>Retourner à l'accueil</p>
      </NavLink>
    </section>
  );
}
export default BoutiqueClose;
