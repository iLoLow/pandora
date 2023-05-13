import { useState, useEffect } from "react";
import "../../../styles/tableaudebord/GalerieAdmin.css";
import ImagePreview from "../../../components/Others/ImagePreview";
import useToast from "../../../hooks/useToast";
import { useSelector, useDispatch } from "react-redux";
import AdminWrapper from "../../../components/Others/AdminWrapper";
import { useNavigate } from "react-router-dom";
import { setLogout } from "../../../state";

function GalerieAdmin() {
  const [galerie, setGalerie] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("");

  const notify = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);

  const getGalerie = async () => {
    try {
      const response = await fetch("/api/thumbs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const datas = await response.json();

      if (datas.code === 500) {
        notify("error", datas.error);
      }
      if (datas.code === 403) {
        notify("error", datas.error);
        dispatch(setLogout());
        navigate("/identification");
      }
      setGalerie(datas);
    } catch (error) {
      notify("error", "Impossible de récupérer les images");
    }
  };

  useEffect(() => {
    getGalerie();
  }, []);

  const filteredGalerie = galerie[selectedFilter];

  const deleteHandleImage = async (image) => {
    const { name } = image;

    if (window.confirm("Voulez-vous supprimer cette image ?")) {
      const response = await fetch(`/api/thumbs/${name}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(image),
      });
      if (response.ok) {
        notify("success", "Image supprimée avec succès");
        getGalerie();
      } else {
        notify("error", "Impossible de supprimer l'image");
      }
    }
  };

  if (galerie.error) {
    return;
  }

  return (
    <AdminWrapper title={"Gestion des Images"}>
      <div className="galerieAdminInfos">
        <div className="galerieAdminMessage">
          <svg stroke="rgb(179,2,3)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className="w-6 h-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
          <p>Vérifier que les images ne soit plus utilisées avant la suppression !</p>
        </div>
        <div className="galerieAdminFiltres">
          <h3>Filtres:</h3>
          <select value={selectedFilter} onChange={(e) => setSelectedFilter(e.target.value)}>
            <option value="all">Toutes</option>
            <option value="avatars">Avatars</option>
            <option value="annonces">Annonces</option>
            <option value="boutique">Boutique</option>
          </select>
        </div>
      </div>
      <div className="galerieAdminContainer">
        {galerie && filteredGalerie
          ? Object.keys(galerie).map(
              (key) => selectedFilter === key && filteredGalerie.map((image, index) => <ImagePreview key={index} image={image} handleClick={() => deleteHandleImage(image)} />)
            )
          : Object.keys(galerie).map((key) => galerie[key].map((image, index) => <ImagePreview key={index} image={image} handleClick={() => deleteHandleImage(image)} />))}
      </div>
    </AdminWrapper>
  );
}

export default GalerieAdmin;
