import { Link } from "react-router-dom";
import "../styles/pages/BoutiqueClose.css";
import BarreReseaux from "../components/Others/BarreReseaux";

function BoutiqueClose() {
  document.title = "La boutique est fermée";
  return (
    <section className="maintenance">
      <h1>La boutique est actuellement fermée et sera de nouveau disponible prochainement.</h1>
      <p>La boutique sera de nouveau disponible dans quelques instants. Si le problème persiste, contactez-nous sur Discord.</p>
      <BarreReseaux />
      <Link to="/" aria-label="Accueil">
        <p>Retourner à l'accueil</p>
      </Link>
    </section>
  );
}
export default BoutiqueClose;
