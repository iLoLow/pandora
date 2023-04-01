import { Link } from "react-router-dom";
import Article from "../components/Article";
import Banner from "../components/Banner";
import "../styles/Accueil.css";
import BannerDev from "../assets/SOYEZ_Laurent_Developpeur_WEB.gif";
import { useState, useEffect } from "react";
import Button from "../components/Button";

function Accueil() {
  document.title = "Pandora RP";

  const [annonces, setAnnonces] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("/api/annonces/last");
        const data = await response.json();
        setAnnonces(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      <section className="presentation">
        <h1 className="presentationTitre">Pandora RP - Serveur GTA RP</h1>
        <Banner />
        <div className="presentationDescription">
          <p>Bienvenue sur notre site de roleplay GTA 5.</p>
          <p>Pandora RP est un serveur WhiteList</p>
        </div>
        <Button children="Rejoins-nous" />
        {annonces && <Article annonce={annonces[0]} />}
        <div className="banniereDev">
          <img src={BannerDev} alt="banner dev" />
        </div>
      </section>
    </>
  );
}
export default Accueil;
