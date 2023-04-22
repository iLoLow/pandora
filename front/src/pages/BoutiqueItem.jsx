import "../styles/boutique/BoutiqueItem.css";
import Slider from "../components/Others/Slider";
import Button from "../components/Others/Button";
import ReactMarkdown from "react-markdown";
function BoutiqueItem({ item, handleReservation = () => {}, handleCloseDetail = () => {} }) {
  const isIncart = JSON.parse(localStorage.getItem("panier"))?.find((cartItem) => cartItem.id === item.id);
  if (!item) return;

  return (
    <section className={"boutiqueItemContainer"}>
      <div className="boutiqueItemButton" onClick={() => handleCloseDetail()}>
        <svg stroke="#0d7f90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="48" d="M244 400L100 256l144-144M120 256h292" />
        </svg>
      </div>
      <Slider arrayImages={JSON.parse(item.image_url)} />
      <div className="boutiqueItemInfos">
        <h2 className="boutiqueItemTitle">{item.name_article}</h2>
        <div className="boutiqueItemTag">{item.type_vehicule}</div>
        <ReactMarkdown className="boutiqueItemDescription" children={item.description} />
      </div>
      <div className="boutiqueItemCart">
        <p className="boutiqueItemPrice">Prix: {item.price} €</p>
        <Button color="green" onClick={() => handleReservation()} disabled={isIncart}>
          {isIncart ? "Déjà  dans le panier" : "Ajouter au panier"}
        </Button>
      </div>
    </section>
  );
}

export default BoutiqueItem;
