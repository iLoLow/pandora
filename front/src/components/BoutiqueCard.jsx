import { useNavigate } from "react-router-dom";
import "../styles/BoutiqueCard.css";
import Button from "./Button";

function BoutiqueCard({ item, handleDetailItem = () => {}, handleReservation = () => {} }) {
  const imageUrl = JSON.parse(item.image_url)[0].split("boutique/")[1];
  const isIncart = JSON.parse(localStorage.getItem("panier"))?.find((cartItem) => cartItem.id === item.id);
  return (
    <article className="boutiqueCard">
      <div className="boutiqueCardContainer" onClick={handleDetailItem}>
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
        <Button color="green" onClick={() => handleReservation()} disabled={isIncart}>
          {isIncart ? "Déjà  dans le panier" : "Ajouter au panier"}
        </Button>
      </div>
    </article>
  );
}

export default BoutiqueCard;
