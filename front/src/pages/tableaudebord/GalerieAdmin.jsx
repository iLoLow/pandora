import { useState, useEffect } from "react";
import "../../styles/tableaudebord/GalerieAdmin.css";
import ImagePreview from "../../components/ImagePreview";
import useToast from "../../hooks/useToast";
import { useSelector } from "react-redux";

function GalerieAdmin() {
  const [galerie, setGalerie] = useState([]);
  const notify = useToast();
  const token = useSelector((state) => state.token);

  const getAnnonces = async () => {
    try {
      const response = await fetch("/api/annonces");
      const data = await response.json();
      if (data.code === 500) {
        notify("error", data.error);
      }
      return data;
    } catch (error) {
      notify("error", "Une erreur c'est produite, veuillez contacter l'administrateur.");
    }
  };

  const getGalerie = async () => {
    try {
      const response = await fetch("/api/thumbs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();

      if (data.code === 500 || data.code === 403) {
        notify("error", data.error);
      }
      return data;
    } catch (error) {
      notify("error", "Impossible de récupérer les images");
    }
  };

  const associateImagesWithAnnonces = async () => {
    try {
      const annonces = await getAnnonces();
      const galerie = await getGalerie();

      if (galerie.length > 0) {
        const galerieWithAnnonces = galerie.map((image) => {
          const annoncesIds = annonces.filter((annonce) => annonce.image_url === `/assets/${image.name}`).map((annonce) => annonce.id);
          return { ...image, annoncesIds };
        });
        setGalerie(galerieWithAnnonces);
      }
    } catch (error) {
      notify("error", "Impossible de récupérer les images");
    }
  };

  useEffect(() => {
    associateImagesWithAnnonces();
  }, []);

  const deleteHandleImage = async (image) => {
    const { name, annoncesIds } = image;

    if (annoncesIds.length > 0) {
      notify("warning", "Cette image est utilisée par une ou plusieurs annonces. Veuillez supprimer les annonces avant de supprimer l'image.");
      return;
    } else {
      if (window.confirm("Voulez-vous supprimer cette image ?")) {
        const response = await fetch(`/api/thumbs/${name}`, {
          method: "DELETE",
        });
        if (response.ok) {
          notify("success", "Image supprimée avec succès");
          associateImagesWithAnnonces();
        } else {
          notify("error", "Impossible de supprimer l'image");
        }
      }
    }
  };

  return (
    <section className="galerieAdmin">
      <h2>Gestion des Images</h2>
      <div className="galerieAdminMessage">
        <svg stroke="rgb(179,2,3)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className="w-6 h-6">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
          />
        </svg>
        <p>Vous pouvez supprimer les images qui ne sont pas utilisées par une annonce.</p>
      </div>
      <div className="galerieAdminContainer">
        {galerie.map((image, index) => (
          <ImagePreview key={index} image={image} handleClick={() => deleteHandleImage(image)} />
        ))}
      </div>
    </section>
  );
}

export default GalerieAdmin;
