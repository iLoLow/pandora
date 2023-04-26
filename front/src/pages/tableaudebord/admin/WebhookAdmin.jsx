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
      <div className="webhookContainer">
        <div className="webhookWrapper">
          <h3>Webhook Annonces</h3>
          <AddWebhookForm values={valuesAnnonces} setValues={setValuesAnnonces} reload={() => getWebhooks()} />
        </div>
        <div className="webhookWrapper">
          <h3>Webhook Boutique</h3>
          <AddWebhookForm values={valuesBoutique} setValues={setValuesBoutique} reload={() => getWebhooks()} />
        </div>
      </div>
    </AdminWrapper>
  );
}

export default WebhookAdmin;
