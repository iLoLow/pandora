import { useNavigate } from "react-router-dom";
import "../styles/BoutiqueCard.css";
import Button from "./Button";

function BoutiqueCard({ item, handleRevervation = () => {} }) {
  const imageUrl = JSON.parse(item.image_url)[0].split("boutique/")[1];
  const navigation = useNavigate();

  const idItem = () => {
    navigation("/boutique/" + item.id, { state: { item } });
  };
  return (
    <article className="boutiqueCard">
      <div className="boutiqueCardContainer" onClick={idItem}>
        <div className="imgContainer">
          <span className="textHover">Voir Détails</span>
          <img src={"/images/boutique/thumbs/" + imageUrl} alt={item.name_article} />
        </div>
        <div className="boutiqueCardInfo">
          <h3>{item.name_article}</h3>
          <p className="boutiqueCardType">{item.type_vehicule}</p>
          <p className="boutiqueCardPrice">{item.price} €</p>
        </div>
      </div>
      <div className="boutiqueBtn">
        <Button color="green" children="Réserver" onClick={handleRevervation} />
      </div>
    </article>
  );
}

export default BoutiqueCard;
