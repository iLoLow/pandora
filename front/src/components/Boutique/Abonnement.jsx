import { useEffect, useState } from "react";
import useToast from "../../hooks/useToast";
import AbonnementCard from "./AbonnementCard";
import "../../styles/boutique/Abonnement.css";
import BoutiqueItem from "../../pages/BoutiqueItem";

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

  const [detail, setDetail] = useState({});
  const [openDetail, setOpenDetail] = useState(false);
  const [showAbonnement, setShowAbonnement] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const handleCloseDetail = () => {
    setDetail({});
    setOpenDetail(!openDetail);
    setShowAbonnement(true);
  };

  return (
    <div className="abonnementCards">
      {showAbonnement &&
        items.map((item) => (
          <AbonnementCard
            key={item.id}
            item={item}
            handleDetailItem={() => {
              setDetail(item), setOpenDetail(!openDetail), setShowAbonnement(!showAbonnement);
            }}
            handleReservation={() => handleReservation(item)}
          />
        ))}
      {openDetail && <BoutiqueItem isOpen={isOpen} item={detail} handleReservation={() => handleReservation(detail)} handleCloseDetail={() => handleCloseDetail()} />}
    </div>
  );
}

export default Abonnement;
