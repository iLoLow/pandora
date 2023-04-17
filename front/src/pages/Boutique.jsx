import "../styles/Boutique.css";
import { useEffect, useState } from "react";
import BoutiqueItem from "../components/BoutiqueItem";
import { useNavigate } from "react-router-dom";
import { useToast } from "react-toastify";

function Boutique() {
  document.title = "Boutique";
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const notify = useToast();

  const getItems = async () => {
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
    getItems();
  }, []);

  return (
    <>
      <section className="boutique">
        <h2>Boutique</h2>

        {items.length > 0 && items.map((item, k) => <BoutiqueItem key={k} item={item} />)}
      </section>
    </>
  );
}

export default Boutique;
