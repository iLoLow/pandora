import { useState } from "react";

import { annonceValidationSchema } from "../../utils/schemasValidation";
import { useSelector, useDispatch } from "react-redux";
import useToast from "../../hooks/useToast";
import { useNavigate } from "react-router-dom";

import WebhookForm from "../../components/Others/WebhookForm";

function AddWebhookForm({ setClose = () => {}, reloadAnnonces = () => {} }) {
  const initialValues = {
    webhook_url: "",
    webhook_disabled: false,
  };

  const token = useSelector((state) => state.token) || "";
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const notify = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createWebhook = async () => {
    try {
      const validatedWebhook = await webhookValidationSchema.validate(values, { abortEarly: false });

      const formData = new FormData();

      for (let value in validatedWebhook) {
        formData.append(value, validatedWebhook[value]);
      }

      const savedWebhookResponse = await fetch("/api/webhooks", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const savedWebhook = await savedWebhookResponse.json();

      if (savedWebhook.code === 500) {
        notify("error", savedWebhook.error);
      }

      if (savedWebhook.code === 403) {
        notify("error", "Vous n'avez pas les droits pour créer un webhook");
      }

      if (savedWebhook.code === 201) {
        notify("success", "Webhook créé");
        reloadWebhooks();
        setErrors({});
        setClose();
      }
    } catch (error) {
      const errors = error.inner.reduce((acc, error) => {
        return { ...acc, [error.path]: error.message };
      }, {});

      setErrors(errors);
    }
  };

  const handleAddWebhookSubmit = (e) => {
    e.preventDefault();
    createWebhook();
  };

  return (
    <section className="webhookFormTitle">
      <WebhookForm values={values} setValues={setValues} errors={errors} handleSubmit={(e) => handleAddWebhookSubmit} />
    </section>
  );
}

export default AddWebhookForm;
