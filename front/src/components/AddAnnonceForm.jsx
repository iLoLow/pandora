import { useState } from "react";
import AnnonceForm from "./AnnonceForm";
import { annonceValidationSchema } from "../utils/schemasValidation";
import { useSelector, useDispatch } from "react-redux";
import useToast from "../hooks/useToast";
import { useNavigate } from "react-router-dom";
import { sendEmbedsToDiscord } from "../services/WebHookDiscord";

function AddAnnonceForm({ setClose = () => {}, reloadAnnonces = () => {} }) {
  const initialValues = {
    title: "",
    description: "",
    image: null,
    image_url: "",
  };

  const { user_id, username, avatar_url } = useSelector((state) => state.user) || "";
  const token = useSelector((state) => state.token) || "";
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const notify = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Discord WebHook Embeds
  const postEmbeds = {
    title: values.title,
    description: "@everyone" + values.description,
    url: import.meta.env.VITE_SITE_URL,
    image: {
      url: import.meta.env.VITE_SITE_URL + values.image_url,
    },
  };

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
        notify("success", savedAnnonce.message);
        setValues(initialValues);
        reloadAnnonces();

        console.log(postEmbeds);
        sendEmbedsToDiscord(postEmbeds);
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
    createAnnonce();
  };

  return (
    <div className="annonceFormTitle">
      <h2>Ajouter Une Annonce :</h2>
      <AnnonceForm values={values} setValues={setValues} errors={errors} handleSubmit={(e) => handleAddAnnonceSubmit(e)} />
    </div>
  );
}

export default AddAnnonceForm;
