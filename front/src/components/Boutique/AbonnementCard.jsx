import Button from "../Others/Button";
import "../../styles/boutique/abonnementCard.css";

function AbonnementCard({ item, handleDetailItem = () => {}, handleReservation = () => {} }) {
  const imageUrl = JSON.parse(item.image_url)[0].split("abonnement/")[1];
  const isIncart = JSON.parse(localStorage.getItem("panier"))?.find((cartAbonnement) => cartAbonnement.id === item.id);
  return (
    <article className="abonnementCard">
      <div className="abonnementCardContainer">
        <div className="imgContainer" onClick={handleDetailItem}>
          <span className="textHover">Voir Détails</span>
          <img src={"/images/abonnement/thumbs/" + imageUrl} alt={item.name_abonnement} />
        </div>
        <div className="abonnementCardInfo">
          <h3>{item.name_abonnement}</h3>
          <p className="abonnementCardDesc">{item.description}</p>
          <p className="abonnementCardPrice">{item.price} €</p>
        </div>
        <div className="abonnementBtn">
          <Button color="green" onClick={() => handleReservation()} disabled={isIncart}>
            {isIncart ? "Déjà  dans le panier" : "Ajouter au panier"}
          </Button>
        </div>
      </div>
    </article>
  );
}

export default AbonnementCard;
