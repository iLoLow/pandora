import { useNavigate } from "react-router-dom";
import "../styles/BoutiqueCard.css";
import Button from "./Button";

function BoutiqueCard({ item }) {
  const navigation = useNavigate();

  const idItem = () => {
    navigation("/boutique/" + item.id, { state: { item } });
  };
  return (
    <article onClick={idItem} className="boutiqueCard">
      <div className="imgContainer">
        <img src={item.image_url} alt={item.name_article} />
      </div>
      <div className="boutiqueCardInfo">
        <h3>{item.name_article}</h3>
        <p className="boutiqueCardType">{item.type_vehicule}</p>
        <p className="boutiqueCardPrice">{item.price} €</p>
        <Button color="green" children="Réserver" />
      </div>
    </article>
  );
}

export default BoutiqueCard;
