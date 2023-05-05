import Button from "../Others/Button";
import "../../styles/boutique/abonnementCard.css";

function AbonnementCard({ abonnement, handleDetailAbonnement = () => {}, handleReservation = () => {} }) {
  const imageUrl = JSON.parse(abonnement.image_url)[0].split("abonnement/")[1];
  const isIncart = JSON.parse(localStorage.getItem("panier"))?.find((cartAbonnement) => cartAbonnement.id === abonnement.id);
  return (
    <article className="abonnementCard">
      <div className="abonnementCardContainer">
        <div className="imgContainer" onClick={handleDetailAbonnement}>
          <span className="textHover">Voir Détails</span>
          <img src={"/images/abonnement/thumbs/" + imageUrl} alt={abonnement.name_abonnement} />
        </div>
        <div className="abonnementCardInfo">
          <h3>{abonnement.name_abonnement}</h3>
          <p className="abonnementCardDesc">{abonnement.description}</p>
          <p className="abonnementCardPrice">{abonnement.price} €</p>
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
