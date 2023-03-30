import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/TableauDeBord.css";
import AnnonceForm from "./AnnonceForm";
import CreateArticle from "../assets/creates.svg";
import ModifierArticle from "../assets/modifier.svg";
import ModifierProfil from "../assets/reglages.svg";

function TableauDeBord() {
  const [isComponentVisible, setIsComponentVisible] = useState(false);

  const handleComponentVisibility = () => {
    setIsComponentVisible(!isComponentVisible);
  };
  const getUser = async (userId) => {
    await fetch("api/user/" + { userId }, {
      method: "GET",
      body: userId,
    });
  };
  return (
    <section className="tableauDeBord">
      <h1 className="tableauDeBordTitre">Tableau de bord</h1>
      <div>
        <button className="tableauDeBordBtn" onClick={handleComponentVisibility}>
          <img className="tableauDeBordIcone" src={CreateArticle} alt="icone creation" /> Créer une annonce
        </button>
        {isComponentVisible && <AnnonceForm />}
      </div>
      <div>
        <button className="tableauDeBordBtn" onClick={handleComponentVisibility}>
          <img className="tableauDeBordIcone" src={ModifierArticle} alt="icone creation" /> Modifier /supprimer une annonce
        </button>
        {isComponentVisible && <AnnonceForm />}
      </div>
      <div>
        <button className="tableauDeBordBtn" onClick={handleComponentVisibility}>
          <img className="tableauDeBordIcone" src={ModifierProfil} alt="icone creation" /> Modifier mon profil
        </button>
        {isComponentVisible && <AnnonceForm />}
      </div>
    </section>
  );
}

export default TableauDeBord;
