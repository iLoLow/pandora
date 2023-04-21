import "../styles/Boutique.css";
import { useEffect, useState } from "react";
import BoutiqueCard from "../components/BoutiqueCard";
import { useNavigate } from "react-router-dom";
import useToast from "../hooks/useToast";
import Panier from "../components/Panier";
import BoutiqueItem from "../pages/BoutiqueItem";

function Boutique() {
  document.title = "Boutique";
  const [items, setItems] = useState([]);
  const [detail, setDetail] = useState({});
  const [openDetail, setOpenDetail] = useState(false);
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("panier")) || []);
  const navigate = useNavigate();
  const notify = useToast();

  const getAllBoutiqueItems = async () => {
    try {
      const response = await fetch("/api/boutique");
      const datas = await response.json();

      setItems(datas);

      if (datas.code === 429) {
        notify("error", datas.error);
      }
    } catch (error) {
      navigate("/erreur");
    }
  };

  useEffect(() => {
    getAllBoutiqueItems();
  }, []);

  const handleReservation = (item) => {
    const newCart = [...cart].concat(item);

    setCart(newCart);

    // Enregistrer le panier mis à jour dans le localStorage
    localStorage.setItem("panier", JSON.stringify(newCart));
  };

  const handleCloseDetail = () => {
    setDetail({});
    setOpenDetail(!openDetail);
  };

  return (
    <>
      <section className="boutiqueContainer">
        {!openDetail && (
          <div className="itemsContainer">
            {items.length > 0 &&
              items.map((item, k) => (
                <BoutiqueCard
                  key={k}
                  handleDetailItem={() => {
                    setDetail(item), setOpenDetail(!openDetail);
                  }}
                  item={item}
                  handleReservation={() => handleReservation(item)}
                />
              ))}
          </div>
        )}
        {openDetail && <BoutiqueItem item={detail} handleReservation={() => handleReservation(detail)} handleCloseDetail={() => handleCloseDetail()} />}
        <Panier cart={cart} setCart={(v) => setCart(v)} />
      </section>
    </>
  );
}

export default Boutique;
