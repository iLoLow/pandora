import "../../styles/others/CarteEquipe.css";

function CarteEquipe({ data }) {
  return (
    <div className="carteEquipe">
      <div className="carteEquipeTexte">
        <div className="item">
          <h3 className="carteEquipeTexteNom">Pseudo Discord : </h3>
          <p>{data.pseudo_discord}</p>
        </div>
        <div className="item">
          <h3 className="carteEquipeTexteNom">Nom et Prénom RP : </h3>
          <p>{data.nom_prenom_rp}</p>
        </div>
        <div className="item fonction">
          <h3 className="carteEquipeTexteNom">Fonction : </h3>
          <p>{data.fonction}</p>
        </div>
        <div className="item description">
          <h3 className="carteEquipeTexteNom">Description : </h3>
          <p>{data.description}</p>
        </div>
      </div>
      <div className="carteEquipeImage">
        <img src={data.avatar_url} alt="photo de l'équipe" />
      </div>
    </div>
  );
}
export default CarteEquipe;
