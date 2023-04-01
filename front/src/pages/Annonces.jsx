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
        const responseUsers = await fetch("/api/users");
        const datasUsers = await responseUsers.json();

        const response = await fetch("/api/annonces");
        const datas = await response.json();

        const newAnnonces = datas.map((data) => {
          const user = datasUsers.find((user) => user.user_id === data.user_id);
          return {
            ...data,
            author: user.username,
            avatar_url: user.avatar_url,
          };
        });
        setAnnonces(newAnnonces);
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
