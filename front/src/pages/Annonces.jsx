import AnnonceForm from "../components/AnnonceForm";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Article from "../components/Article";
import "../styles/Annonces.css";

function Annonces() {
  const [annonces, setAnnonces] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("/api/annonces");
        const datas = await response.json();

        setAnnonces(datas);
      } catch (error) {
        navigate("/erreur");
      }
    })();
  }, []);

  return (
    <>
      <section className="annonces">
        <h2 className="titleAnnonces">Annonces du Serveur</h2>

        {annonces.length > 0 && annonces.map((annonce, k) => <Article key={k} annonce={annonce} />)}
      </section>
    </>
  );
}
export default Annonces;
