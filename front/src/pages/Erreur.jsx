import { Link } from "react-router-dom";
import "../styles/Erreur.css";

function Erreur() {
  document.title = "Erreur";
  return (
    <section className="erreur">
      <h1>Eh, mec, t'es perdu. La page que tu cherches n'existe pas.</h1>
      <p>Si c'est notre erreur, contacte-nous. Sinon, retourne à la case départ et essaie autre chose, mec. Bonne chance."</p>
      <Link to="/" aria-label="Accueil">
        <p>Retourner à l'acceuil</p>
      </Link>
    </section>
  );
}
export default Erreur;
