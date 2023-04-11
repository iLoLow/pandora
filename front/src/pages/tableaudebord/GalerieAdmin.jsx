import { useState, useEffect } from "react";
import "../../styles/tableaudebord/GalerieAdmin.css";
import ImagePreview from "../../components/ImagePreview";
import useToast from "../../hooks/useToast";

function GalerieAdmin() {
  const [galerie, setGalerie] = useState([]);
  const notify = useToast();

  const getAnnonces = async () => {
    try {
      const response = await fetch("/api/annonces");
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  };

  const getGalerie = async () => {
    try {
      const response = await fetch("/api/thumbs");
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  };

  const associateImagesWithAnnonces = async () => {
    const annonces = await getAnnonces();
    const galerie = await getGalerie();
    try {
      const galerieWithAnnonces = galerie.map((image) => {
        const annoncesIds = annonces.filter((annonce) => annonce.image_url === `/assets/${image.name}`).map((annonce) => annonce.id);
        return { ...image, annoncesIds };
      });
      setGalerie(galerieWithAnnonces);
    } catch (error) {
      console.error(error);
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
      <div className="galerieAdminContainer">
        {galerie.map((image, index) => (
          <ImagePreview key={index} image={image} handleClick={() => deleteHandleImage(image)} />
        ))}
      </div>
    </section>
  );
}

export default GalerieAdmin;
