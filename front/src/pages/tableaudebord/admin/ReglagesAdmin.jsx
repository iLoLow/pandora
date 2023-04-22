import AdminWrapper from "../../../components/Others/AdminWrapper";
import GestionBanner from "../../../components/Banner/GestionBanner";
import AddWebhookForm from "../../../components/Others/AddWebhookForm";

function ReglagesAdmin() {
  return (
    <AdminWrapper title="Réglages">
      <GestionBanner />
      <div className="containerForm">
        <h2>Ajouter un Webhook pour les annonces</h2>
        <AddWebhookForm />
      </div>
    </AdminWrapper>
  );
}

export default ReglagesAdmin;
