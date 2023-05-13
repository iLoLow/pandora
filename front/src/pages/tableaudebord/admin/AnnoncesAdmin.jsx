import AdminWrapper from "../../../components/Others/AdminWrapper";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import useToast from "../../../hooks/useToast";
import AdminAnnonceCard from "../../../components/Annonce/AdminAnnonceCard";
import ModifyAnnonceForm from "../../../components/Annonce/ModifyAnnonceForm";
import { useNavigate } from "react-router-dom";
import { setLogout } from "../../../state";

function AnnoncesAdmin() {
  const token = useSelector((state) => state.token);
  const [annonces, setAnnonces] = useState([]);
  const [editAnnonceIndex, setEditAnnonceIndex] = useState(-1);
  const notify = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getAnnonces = async () => {
    try {
      const response = await fetch("/api/annonces");
      const datas = await response.json();

      if (datas.code === 500 || datas.code === 429 || datas.code === 403) {
        notify("error", datas.error);
      }
      setAnnonces(datas);
    } catch (error) {
      console.error(error);
      notify("error", "Erreur interne du serveur.");
    }
  };

  useEffect(() => {
    getAnnonces();
  }, []);

  const deleteHandleAnnonce = async (id) => {
    if (confirm("Voulez-vous vraiment supprimer cette annonce ?")) {
      try {
        const response = await fetch("/api/annonces/" + id, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (data.code === 500) {
          notify("error", data.error);
        }

        if (data.code === 403) {
          notify("error", data.error);
          dispatch(setLogout());
          navigate("/identification");
        }

        notify("success", data.message);
        setAnnonces(annonces.filter((annonce) => annonce.id !== id));
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (annonces.error) {
    return;
  }

  return (
    <AdminWrapper title="Gestion Des Annonces">
      <div className="adminAnnoncesCards">
        {annonces &&
          annonces.map((annonce, index) => (
            <div key={annonce.id}>
              <AdminAnnonceCard annonce={annonce} handleEditAnnonce={() => setEditAnnonceIndex(index)} deleteHandleAnnonce={() => deleteHandleAnnonce(annonce.id)} />
              {editAnnonceIndex === index && <ModifyAnnonceForm annonce={annonce} setClose={() => setEditAnnonceIndex(-1)} reloadAnnonces={() => getAnnonces()} />}
            </div>
          ))}
      </div>
    </AdminWrapper>
  );
}

export default AnnoncesAdmin;
