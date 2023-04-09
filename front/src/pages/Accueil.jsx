import Article from "../components/Article";
import Banner from "../components/Banner";
import "../styles/Accueil.css";
import BannerDev from "../assets/SOYEZ_Laurent_Developpeur_WEB.gif";
import { useState, useEffect } from "react";
import BarreReseaux from "../components/BarreReseaux";
document.title = "Pandora RP";

function Accueil() {
  const [annonces, setAnnonces] = useState([]);

  const fetchAnnonces = async () => {
    try {
      const response = await fetch("/api/annonces/last");
      const data = await response.json();
      setAnnonces(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAnnonces();
  }, []);

  return (
    <>
      <section className="presentation">
        <h1 className="presentationTitre">Pandora RP - Serveur GTA RP</h1>
        <Banner />
        <div className="presentationDescription">
          <h2>Bienvenue sur notre site de roleplay GTA 5.</h2>
          <p>Pandora RP est un serveur WhiteList</p>
        </div>
        <BarreReseaux />
        {annonces.length >= 1 && <Article annonce={annonces[0]} reload={fetchAnnonces} />}
        <div className="banniereDev">
          <img src={BannerDev} alt="banner dev" />
        </div>
      </section>
    </>
  );
}
export default Accueil;
