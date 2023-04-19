import { useNavigate } from "react-router-dom";
import "../styles/BoutiqueCard.css";
import Button from "./Button";

function BoutiqueCard({ boutique, handleRevervation = () => {} }) {
  const navigation = useNavigate();

  const idItem = () => {
    navigation("/boutique/" + boutique.id, { state: { boutique } });
  };
  return (
    <article className="boutiqueCard">
      <div className="boutiqueCardContainer" onClick={idItem}>
        <div className="imgContainer">
          <span className="textHover">Voir Détails</span>
          <img src={boutique.image_url} alt={boutique.name_article} />
        </div>
        <div className="boutiqueCardInfo">
          <h3>{boutique.name_article}</h3>
          <p className="boutiqueCardType">{boutique.type_vehicule}</p>
          <p className="boutiqueCardPrice">{boutique.price} €</p>
        </div>
      </div>
      <div className="boutiqueBtn">
        <Button color="green" children="Réserver" onClick={handleRevervation} />
      </div>
    </article>
  );
}

export default BoutiqueCard;
