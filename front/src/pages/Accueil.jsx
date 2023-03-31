import { Link } from "react-router-dom";
import Article from "../components/Article";
import Banner from "../components/Banner";
import BarreReseaux from "../components/BarreReseaux";
import "../styles/Accueil.css";
import BannerDev from "../assets/SOYEZ_Laurent_Developpeur_WEB.gif";

function Accueil() {
  document.title = "Pandora RP";

  return (
    <>
      <section className="presentation">
        <h1 className="presentationTitre">Pandora RP - Serveur GTA RP</h1>
        <Banner />
        <div className="presentationDescription">
          <p>Bienvenue sur notre site de roleplay GTA 5.</p>
          <p>Pandora RP est un serveur WhiteList</p>
        </div>
        <button className="btn">
          <Link to="/rejoindre">Rejoins-nous</Link>
        </button>
        {/* <Article  /> */}{" "}
        <div className="banniereDev">
          <img src={BannerDev} alt="banner dev" />
        </div>
      </section>

      {/* <BarreReseaux /> */}
    </>
  );
}
export default Accueil;
