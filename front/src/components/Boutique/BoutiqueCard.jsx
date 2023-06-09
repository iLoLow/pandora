import "../../styles/boutique/boutiqueCard.css";
import Button from "../Others/Button";

function BoutiqueCard({ item, handleDetailItem = () => {}, handleReservation = () => {} }) {
  const imageUrl = JSON.parse(item.image_url)[0].split("boutique/")[1];
  const isIncart = JSON.parse(localStorage.getItem("panier"))?.find((cartItem) => cartItem.id === item.id);
  return (
    <article className="boutiqueCard">
      <div className="boutiqueCardContainer">
        <div className="imgContainer" onClick={handleDetailItem}>
          <span className="textHover">Voir Détails</span>
          <img src={"/images/boutique/thumbs/" + imageUrl} alt={item.name_article} />
        </div>
        <div className="boutiqueCardInfo">
          <h3>{item.name_article}</h3>
          <p className="boutiqueCardType">{item.type_vehicule}</p>
          <p className="boutiqueCardPrice">{item.price} €</p>
        </div>
        <div className="boutiqueBtn">
          <Button color="green" onClick={() => handleReservation()} disabled={isIncart}>
            {isIncart ? "Déjà  dans le panier" : "Ajouter au panier"}
          </Button>
        </div>
      </div>
    </article>
  );
}

export default BoutiqueCard;
