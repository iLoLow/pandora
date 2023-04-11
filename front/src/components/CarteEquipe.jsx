import "../styles/CarteEquipe.css";

function CarteEquipe({ data }) {
  return (
    <div className="carteEquipe">
      <div className="carteEquipeTexte">
        <div className="item">
          <h3 className="carteEquipeTexteNom">Pseudo Discord : </h3>
          <p>{data.nom}</p>
        </div>
        <div className="item">
          <h3 className="carteEquipeTexteNom">Nom et Prénom RP : </h3>
          <p>{data.nomrp}</p>
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
        <img src={data.avatarequipe} alt="photo de l'équipe" />
      </div>
    </div>
  );
}
export default CarteEquipe;
