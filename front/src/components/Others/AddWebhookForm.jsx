import Button from "./Button";
import useToast from "../../hooks/useToast";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../../state";
import { addWebhookValidationSchema } from "../../utils/schemasValidation";
import { useState } from "react";

function AddWebhookForm({ values, setValues, reload = () => {} }) {
  const token = useSelector((state) => state.token) || "";
  const notify = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorsAnnonces, setErrorsAnnonces] = useState({});
  const [errorsBoutique, setErrorsBoutique] = useState({});

  const createWebhook = async () => {
    try {
      const validatedWebhook = await addWebhookValidationSchema.validate(values, { abortEarly: false });
      const response = await fetch("/api/webhooks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(validatedWebhook),
      });

      const savedWebhook = await response.json();

      if (savedWebhook.code === 500) {
        notify("error", savedWebhook.error);
      }

      if (savedWebhook.code === 403) {
        notify("error", savedWebhook.error);
        dispatch(setLogout());
        navigate("/identifcation");
      }

      if (savedWebhook.code === 201) {
        notify("success", "Webhook créé");
        reload();
        setErrorsBoutique({});
        setErrorsAnnonces({});
      }
    } catch (error) {
      const errors = error.inner.reduce((acc, error) => {
        return { ...acc, [error.path]: error.message };
      }, {});
      if (values.type === "annonces") {
        setErrorsAnnonces(errors);
        setErrorsBoutique({});
      }
      if (values.type === "boutique") {
        setErrorsBoutique(errors);
        setErrorsAnnonces({});
      }
    }
  };

  const handleAddWebhookSubmit = (e) => {
    e.preventDefault();
    createWebhook();
  };

  const deleteWebhookByType = async (type) => {
    try {
      const response = await fetch("/api/webhooks/" + type, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
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
      reload();
      notify("success", data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = () => {
    deleteWebhookByType(values.type);
  };

  const handelActiveWebhook = async () => {
    try {
      const response = await fetch("/api/webhooks/" + values.type, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({ active: !values.active }),
      });
      const data = await response.json();
      setValues(data);

      if (data.code === 500) {
        notify("error", data.error);
      }

      if (data.code === 403) {
        notify("error", data.error);
        dispatch(setLogout());
        navigate("/identification");
      }
      if (data.active) {
        notify("success", "Webhook " + values.type + " est activé.");
      } else {
        notify("success", "Webhook " + values.type + " est désactivé.");
      }
    } catch (error) {
      notify("info", "Veuillez créer le webhook " + values.type + " pour l'activé.");
    }
  };

  return (
    <form className="form" method="POST" onSubmit={(e) => handleAddWebhookSubmit(e)}>
      <form-group>
        <label>URL du Webhook :</label>
        <input type="text" value={values.webhook_url} onChange={(e) => setValues({ ...values, webhook_url: e.target.value })} />
        {errorsAnnonces.webhook_url && <small className="errorSmall">{errorsAnnonces.webhook_url}</small>}
        {errorsBoutique.webhook_url && <small className="errorSmall">{errorsBoutique.webhook_url}</small>}
      </form-group>
      <form-group>
        <label>ID du serveur Discord :</label>
        <input type="text" value={values.server_id} onChange={(e) => setValues({ ...values, server_id: e.target.value })} />
        {errorsAnnonces.server_id && <small className="errorSmall">{errorsAnnonces.server_id}</small>}
        {errorsBoutique.server_id && <small className="errorSmall">{errorsBoutique.server_id}</small>}
      </form-group>
      <form-group>
        <label>ID du Rôle à mentionner:</label>
        <input type="text" value={values.role_id} onChange={(e) => setValues({ ...values, role_id: e.target.value })} />
        {errorsAnnonces.role_id && <small className="errorSmall">{errorsAnnonces.role_id}</small>}
        {errorsBoutique.role_id && <small className="errorSmall">{errorsBoutique.role_id}</small>}
      </form-group>

      <div className="webhookBtnsWrapper">
        <div className="webhookBtns">
          <Button disabled={!!values.id} type="submit" color="green" children="Enregistrer" />
          <Button disabled={!values.id || !!values.active} type="button" color="red" children="Supprimer" onClick={handleDelete} />
        </div>
        <div className="toggleBtn" onClick={() => handelActiveWebhook()}>
          <span className={!!values.active ? "toggle active" : "toggle inactive"}></span>
        </div>
      </div>
    </form>
  );
}

export default AddWebhookForm;
