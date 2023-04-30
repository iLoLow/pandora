import "../styles/boutique/Boutique.css";
import { useEffect, useState } from "react";
import BoutiqueCard from "../components/Boutique/BoutiqueCard";
import { useNavigate, Navigate } from "react-router-dom";
import useToast from "../hooks/useToast";
import Panier from "../components/Boutique/Panier";
import BoutiqueItem from "../pages/BoutiqueItem";

function Boutique() {
  document.title = "Boutique";
  const [items, setItems] = useState([]);
  const [detail, setDetail] = useState({});
  const [openDetail, setOpenDetail] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("panier")) || []);
  const navigate = useNavigate();
  const notify = useToast();

  const getAllBoutiqueItems = async () => {
    try {
      const response = await fetch("/api/boutique");
      const datas = await response.json();

      if (datas.length === 0) {
        navigate("/boutique/maintenance");
      }

      setItems(datas);

      if (datas.code === 429) {
        notify("error", datas.error);
      }
    } catch (error) {
      navigate("/boutique/maintenance");
    }
  };

  useEffect(() => {
    getAllBoutiqueItems();
  }, []);

  const handleReservation = (item) => {
    const newItem = {
      id: item.id,
      name_article: item.name_article,
      type_vehicule: item.type_vehicule,
      price: item.price,
    };

    const newCart = [...cart].concat(newItem);

    // Enregistrer le panier mis à jour dans le localStorage
    localStorage.setItem("panier", JSON.stringify(newCart));
    setCart(JSON.parse(localStorage.getItem("panier")));
    notify("success", "Article ajouté au panier");
  };

  const handleCloseDetail = () => {
    setDetail({});
    setOpenDetail(!openDetail);
  };

  return (
    <>
      <section className="boutiqueContainer">
        <div className="boutiquePanierBtn" onClick={() => setIsOpen(!isOpen)}>
          <svg fill="#0d7f90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <circle cx="176" cy="416" r="32" />
            <circle cx="400" cy="416" r="32" />
            <path d="M456.8 120.78a23.92 23.92 0 00-18.56-8.78H133.89l-6.13-34.78A16 16 0 00112 64H48a16 16 0 000 32h50.58l45.66 258.78A16 16 0 00160 368h256a16 16 0 000-32H173.42l-5.64-32h241.66A24.07 24.07 0 00433 284.71l28.8-144a24 24 0 00-5-19.93z" />
          </svg>
          <span className="boutiquePanierBtnNumero">{cart.length}</span>
        </div>
        <div className={isOpen ? "boutiquePanier isOpen" : "boutiquePanier"}>
          <Panier cart={cart} setCart={setCart} isOpen={isOpen} />
        </div>
        <div className={isOpen ? "boutiqueComponents panierIsOpen" : "boutiqueComponents"}>
          {!openDetail && (
            <div className="boutiqueCards">
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
          {openDetail && <BoutiqueItem isOpen={isOpen} item={detail} handleReservation={() => handleReservation(detail)} handleCloseDetail={() => handleCloseDetail()} />}
        </div>
      </section>
    </>
  );
}

export default Boutique;
