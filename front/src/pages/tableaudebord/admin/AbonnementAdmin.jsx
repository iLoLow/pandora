import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useToast from "../../../hooks/useToast";
import AdminWrapper from "../../../components/Others/AdminWrapper";
import AdminAbonnementCard from "../../../components/Boutique/AdminAbonnementCard";
import AddAbonnementForm from "../../../components/Boutique/AddAbonnementForm";
import EditAbonnement from "../../../components/Boutique/EditAbonnement";
import "../../../styles/tableaudebord/AbonnementAdmin.css";

function AbonnementAdmin() {
  const token = useSelector((state) => state.token) || "";
  const [abonnementItems, setAbonnementItems] = useState([]);
  const [addAbonnementItem, setAddAbonnementItem] = useState(false);
  const [editAbonnementItemIndex, setEditAbonnementItemIndex] = useState(-1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const notify = useToast();

  const getAbonnementItems = async () => {
    try {
      const response = await fetch("/api/abonnement", {
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
      setAbonnementItems(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAbonnementItems();
  }, []);

  const deleteHandleAbonnementItem = async (id) => {
    if (confirm("Voulez-vous vraiment supprimer cet abonnement ?")) {
      try {
        const response = await fetch("/api/abonnement/" + id, {
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
          notify("error", data.message);
          dispatch(setLogout());
          navigate("/identification");
        }
        notify("success", data.message);
        getAbonnementItems(abonnementItems.filter((abonnement) => abonnement.id !== id));
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <AdminWrapper title={"Gestion Des Abonnements"}>
      <button className="addAbonnementBtn" onClick={() => setAddAbonnementItem(!addAbonnementItem)}>
        <svg fill="rgb(5, 142, 34)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm80 224h-64v64a16 16 0 01-32 0v-64h-64a16 16 0 010-32h64v-64a16 16 0 0132 0v64h64a16 16 0 010 32z" />
        </svg>
      </button>
      {addAbonnementItem && <AddAbonnementForm setClose={() => setAddAbonnementItem(false)} reloadAbonnement={() => getAbonnementItems()} />}

      {abonnementItems.length > 0 &&
        abonnementItems.map((abonnement, index) => (
          <div key={abonnement.id}>
            <AdminAbonnementCard abonnement={abonnement} editHandle={() => setEditAbonnementItemIndex(index)} deleteHandle={() => deleteHandleAbonnementItem(abonnement.id)} />

            {editAbonnementItemIndex === index && (
              <EditAbonnement abonnement={abonnement} setClose={() => setEditAbonnementItemIndex(-1)} reloadAbonnement={() => getAbonnementItems()} />
            )}
          </div>
        ))}
    </AdminWrapper>
  );
}

export default AbonnementAdmin;
