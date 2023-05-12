import { useState, useEffect } from "react";
import AnnonceForm from "./AnnonceForm";
import { annonceValidationSchema } from "../../utils/schemasValidation";
import { useSelector, useDispatch } from "react-redux";
import useToast from "../../hooks/useToast";
import { useNavigate } from "react-router-dom";
import { getInfosWebhook, sendEmbedsToDiscord } from "../../services/WebHookDiscord";
import ButtonClose from "../Others/ButtonClose";

function AddAnnonceForm({ setClose = () => {}, reloadAnnonces = () => {} }) {
  const initialValues = {
    title: "",
    description: "",
    annonce_image: null,
  };

  const { user_id, username, avatar_url } = useSelector((state) => state.user) || "";
  const token = useSelector((state) => state.token) || "";
  const [values, setValues] = useState(initialValues);
  const [whInfos, setWhInfos] = useState({});
  const [errors, setErrors] = useState({});
  const notify = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const renameFileImage = (originalFile, newName) => {
    const extension = originalFile.type.split("image/")[1];
    const name = newName + "." + extension;
    return new File([originalFile], name, {
      type: originalFile.type,
      lastModified: originalFile.lastModified,
    });
  };

  const getInfosWebhookAnnonces = async () => {
    try {
      const wh = await getInfosWebhook("annonces");

      setWhInfos(wh);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getInfosWebhookAnnonces();
  }, []);

  const createAnnonce = async () => {
    try {
      const validatedAnnonces = await annonceValidationSchema.validate(values, { abortEarly: false });

      const formData = new FormData();

      for (let value in validatedAnnonces) {
        formData.append(value, validatedAnnonces[value]);
      }

      formData.append("user_id", user_id);
      formData.append("username", username);
      formData.append("avatar_url", avatar_url);

      const savedAnnonceResponse = await fetch("/api/annonces", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const savedAnnonce = await savedAnnonceResponse.json();

      if (savedAnnonce.code === 500) {
        notify("error", savedAnnonce.error);
      }

      if (savedAnnonce.code === 403) {
        notify("error", savedAnnonce.error);
        dispatch(setLogout());
        navigate("/identification");
      }

      if (savedAnnonce) {
        const file = renameFileImage(validatedAnnonces.annonce_image, "annonce");
        const url = window.location.origin;
        const descriptionLines = values.description.split("\n");
        const firstFiveLines = descriptionLines.slice(0, 5).join("\n");
        const message = {
          content: `<@&${whInfos.role_id}>`,
          embeds: [
            {
              color: 3447003,
              title: values.title,
              description: firstFiveLines + "...",
              image: {
                url: `attachment://${file.name}`,
              },
              fields: [
                {
                  name: "\u200B",
                  value: `[Lire la suite sur Pandora RP](${url})`,
                },
              ],
            },
          ],
        };

        const formdataDiscord = new FormData();

        formdataDiscord.append("blob", file);
        formdataDiscord.append("payload_json", JSON.stringify(message));
        if (Boolean(whInfos.active)) {
          await sendEmbedsToDiscord(whInfos.webhook_url, formdataDiscord);
        }

        notify("success", savedAnnonce.message);
        setValues(initialValues);

        reloadAnnonces();
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

  const handleAddAnnonceSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    createAnnonce();
  };

  return (
    <div className="annonceFormTitle">
      <div className="containerForm">
        <ButtonClose handleClick={() => setClose()} />
        <h2>Ajouter Une Annonce :</h2>
        <AnnonceForm values={values} setValues={setValues} errors={errors} handleSubmit={(e) => handleAddAnnonceSubmit(e)} />
      </div>
    </div>
  );
}

export default AddAnnonceForm;
