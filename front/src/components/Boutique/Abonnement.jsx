import { useEffect, useState } from "react";
import useToast from "../../hooks/useToast";
import AbonnementCard from "./AbonnementCard";
import "../../styles/boutique/Abonnement.css";

//affichage des abonnements
function Abonnement({ cart, setCart }) {
  document.title = "Abonnement";

  const notify = useToast();
  const [items, setItems] = useState([]);
  const handleReservation = (item) => {
    const newItem = {
      id: item.id,
      name_article: item.name_abonnement,
      price: item.price,
    };

    const newCart = [...cart].concat(newItem);

    // Enregistrer le panier mis à jour dans le localStorage
    localStorage.setItem("panier", JSON.stringify(newCart));
    setCart(JSON.parse(localStorage.getItem("panier")));
    notify("success", "Abonnement ajouté au panier");
  };

  const getAllAbonnementItems = async () => {
    try {
      const response = await fetch("/api/abonnement");
      const datas = await response.json();

      setItems(datas);

      if (datas.code === 429) {
        notify("error", datas.error);
      }
    } catch (error) {
      navigate("/boutique/maintenance");
    }
  };

  useEffect(() => {
    getAllAbonnementItems();
  }, []);

  return (
    <div className="abonnementCards">
      {items.map((item) => (
        <AbonnementCard key={item.id} abonnement={item} handleReservation={() => handleReservation(item)} />
      ))}
    </div>
  );
}

export default Abonnement;
