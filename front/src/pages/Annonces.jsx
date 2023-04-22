import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Article from "../components/Annonce/Article";
import "../styles/annonce/Annonces.css";
import useToast from "../hooks/useToast";

function Annonces() {
  document.title = "Annonces";
  const [annonces, setAnnonces] = useState([]);
  const navigate = useNavigate();
  const notify = useToast();

  const getAnnonces = async () => {
    try {
      const response = await fetch("/api/annonces");
      const datas = await response.json();

      setAnnonces(datas);

      if (datas.code === 429) {
        notify("error", datas.error);
      }
    } catch (error) {
      navigate("/erreur");
    }
  };

  useEffect(() => {
    getAnnonces();
  }, []);

  return <section className="annonces">{annonces.length > 0 && annonces.map((annonce, k) => <Article reload={getAnnonces} key={k} annonce={annonce} />)}</section>;
}
export default Annonces;
