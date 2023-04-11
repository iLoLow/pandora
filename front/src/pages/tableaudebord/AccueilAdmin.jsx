import "../../styles/tableaudebord/AccueilAdmin.css";
import Button from "../../components/Button";
import { useState } from "react";

function AccueilAdmin() {
  const [isCopied, setIsCopied] = useState(false);
  const linkToCopy = "https://localhost:3000/identification";

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(linkToCopy);
      setIsCopied(true);
    } catch (err) {
      console.error("Erreur de copie:", err);
    }
  };

  return (
    <section className="accueilAdminWrapper">
      {/* header */}
      <h2>Bienvenue sur le tableau de bord</h2>
      <div className="accueilAdminHeader">
        <Button onClick={handleCopyClick}>{isCopied ? "Copié !" : "Copier le lien d'inscription"}</Button>
      </div>
    </section>
  );
}
export default AccueilAdmin;

//afficher nombre d'inscrits.
//afficher les  inscrits, pour pouvoir les supprimer.
//afficher nombre de commandes boutiques.
//afficher nombre d'articles de l'utilisateur.
//afficher nombre d'articles total.
//afficher nombre de likes sur les articles crees par l'utilisateur.*/
