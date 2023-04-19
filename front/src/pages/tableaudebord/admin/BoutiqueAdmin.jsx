import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useToast from "../../../hooks/useToast";
import AdminWrapper from "../../../components/AdminWrapper";
import AdminBoutiqueCard from "../../../components/AdminBoutiqueCard";
import AddBoutiqueForm from "../../../components/AddBoutiqueForm";
import EditBoutiqueItem from "../../../components/EditBoutiqueItem";
import "../../../styles/tableaudebord/BoutiqueAdmin.css";

// composant AddBoutiqueItem => BoutiqueForm
// composant UpdateBoutiqueItem => BoutiqueForm

// dans boutique admin AddBoutiqueForm
// CardBoutiqueItemsAdmin

function BoutiqueAdmin() {
  const token = useSelector((state) => state.token) || "";
  const [boutiqueItems, setBoutiqueItems] = useState([]);
  const [addBoutiqueItem, setAddBoutiqueItem] = useState(false);
  const [editBoutiqueItemIndex, setEditBoutiqueItemIndex] = useState(-1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const notify = useToast();

  const getBoutiqueItems = async () => {
    try {
      const response = await fetch("/api/boutique", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.code === 500) {
        notify("error", data.error);
      }

      if (data.code === 429) {
        notify("error", data.error);
      }

      if (data.code === 403) {
        notify("error", data.error);
        dispatch(setLogout());
        navigate("/identification");
      }
      setBoutiqueItems(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBoutiqueItems();
  }, []);

  const deleteHandleBoutiqueItem = async (id) => {
    if (confirm("Voulez-vous vraiment supprimer cet article ?")) {
      try {
        const response = await fetch("/api/boutique/" + id, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (data.code === 500) {
          notify("error", data.error);
        }

        if (data.code === 429) {
          notify("error", data.error);
        }

        if (data.code === 403) {
          notify("error", data.error);
          dispatch(setLogout());
          navigate("/identification");
        }
        notify("success", data.message);
        getBoutiqueItems(boutiqueItems.filter((item) => item.id !== id));
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <AdminWrapper title={"Gestion De La Boutique"}>
      <button className="addBoutiqueBtn" onClick={() => setAddBoutiqueItem(!addBoutiqueItem)}>
        <svg fill="rgb(5, 142, 34)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm80 224h-64v64a16 16 0 01-32 0v-64h-64a16 16 0 010-32h64v-64a16 16 0 0132 0v64h64a16 16 0 010 32z" />
        </svg>
      </button>
      {addBoutiqueItem && <AddBoutiqueForm setClose={() => setAddBoutiqueItem(false)} reloadBoutique={() => getBoutiqueItems()} />}

      {boutiqueItems.length > 0 &&
        boutiqueItems.map((item, index) => (
          <div key={item.id}>
            <AdminBoutiqueCard boutique={item} editHandle={() => setEditBoutiqueItemIndex(index)} deleteHandle={() => deleteHandleBoutiqueItem(item.id)} />

            {editBoutiqueItemIndex === index && <EditBoutiqueItem item={item} setClose={() => setEditBoutiqueItemIndex(-1)} reload={() => getBoutiqueItems()} />}
          </div>
        ))}
    </AdminWrapper>
  );
}
export default BoutiqueAdmin;
//deux onglets pour la boutique , articles et formule d'abonnements.
