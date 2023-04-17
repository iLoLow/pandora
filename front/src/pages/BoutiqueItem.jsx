import "../styles/BoutiqueItem.css";
import { useLocation } from "react-router-dom";
import Slider from "../components/Slider";
import Button from "../components/Button";
import ReactMarkdown from "react-markdown";
function BoutiqueItem() {
  const location = useLocation();
  const { item } = location.state;

  return (
    <section className="boutiqueItemContainer">
      <Slider arrayImages={[item.image_url, item.image_url]} />
      <div className="boutiqueItemInfos">
        <h2 className="boutiqueItemTitle">{item.name_article}</h2>
        <div className="boutiqueItemTag">{item.type_vehicule}</div>
        <ReactMarkdown className="boutiqueItemDescription" children={item.description} />
      </div>
      <div className="boutiqueItemCart">
        <p className="boutiqueItemPrice">Prix: {item.price} €</p>
        <Button color="green" children="Réserver" />
      </div>
    </section>
  );
}

export default BoutiqueItem;
