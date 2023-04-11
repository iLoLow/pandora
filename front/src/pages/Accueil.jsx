import Article from "../components/Article";
import Banner from "../components/Banner";
import "../styles/Accueil.css";
import { useState, useEffect } from "react";
import BarreReseaux from "../components/BarreReseaux";
document.title = "Pandora RP";
import useToast from "../hooks/useToast";

function Accueil() {
  const [annonces, setAnnonces] = useState([]);
  const notify = useToast();

  const fetchAnnonces = async () => {
    try {
      const response = await fetch("/api/annonces/last");
      const data = await response.json();
      setAnnonces(data);

      if (data.code === 429) {
        notify("error", data.error);
      }
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
      </section>
    </>
  );
}
export default Accueil;
