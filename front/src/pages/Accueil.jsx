import { Link } from "react-router-dom";
import Article from "../components/Article";
import Banner from "../components/Banner";
import BarreReseaux from "../components/BarreReseaux";
import "../styles/Accueil.css";

function Accueil() {
  document.title = "Pandora RP";

  return (
    <>
      <section className="presentation">
        <Banner />
        <h1 className="presentationTitre">Pandora RP - Serveur GTA RP</h1>
        <div className="presentationDescription">
          <p>Bienvenue sur notre site de roleplay GTA 5.</p>
          <p>Pandora RP est un serveur WhiteList</p>
        </div>
        <button className="btn">
          <Link to="/rejoindre">Rejoins-nous</Link>
        </button>
      </section>
      <Article />
      <BarreReseaux />
    </>
  );
}
export default Accueil;
