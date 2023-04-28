import AdminWrapper from "../../../components/Others/AdminWrapper";
import AddWebhookForm from "../../../components/Others/AddWebhookForm";
import "../../../styles/tableaudebord/WebhookAdmin.css";
import { useState, useEffect } from "react";
import useToast from "../../../hooks/useToast";

function WebhookAdmin() {
  const initialValuesAnnonce = {
    id: null,
    type: "annonces",
    webhook_url: "",
    server_id: "",
    role_id: "",
    active: false,
  };

  const initialValuesBoutique = {
    id: null,
    type: "boutique",
    webhook_url: "",
    server_id: "",
    role_id: "",
    active: false,
  };

  const [valuesAnnonces, setValuesAnnonces] = useState(initialValuesAnnonce);
  const [valuesBoutique, setValuesBoutique] = useState(initialValuesBoutique);
  const notify = useToast();

  const getWebhooks = async () => {
    try {
      const response = await fetch("/api/webhooks");
      const data = await response.json();
      if (data.code === 500) {
        notify("error", data.error);
      }

      if (data) {
        const whAnnonce = (await data.find((v) => v.type === "annonces")) || initialValuesAnnonce;
        const whboutique = (await data.find((v) => v.type === "boutique")) || initialValuesBoutique;
        setValuesAnnonces(whAnnonce);
        setValuesBoutique(whboutique);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWebhooks();
  }, []);

  return (
    <AdminWrapper title="Webhooks">
      <section className="webhookContainer">
        <div className="containerForm">
          <h2>Webhook Annonces</h2>
          <AddWebhookForm values={valuesAnnonces} setValues={setValuesAnnonces} reload={() => getWebhooks()} />
        </div>
        <div className="containerForm">
          <h2>Webhook Boutique</h2>
          <AddWebhookForm values={valuesBoutique} setValues={setValuesBoutique} reload={() => getWebhooks()} />
        </div>
      </section>
    </AdminWrapper>
  );
}

export default WebhookAdmin;
