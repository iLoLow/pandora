import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogout } from "../../state";
import useToast from "../../hooks/useToast";
import AbonnementForm from "./AbonnementForm";
import { modifyAbonnementValidationSchema } from "../../utils/schemasValidation";
import ButtonClose from "../Others/ButtonClose";

function EditAbonnement({ abonnement, setClose = () => {}, reloadAbonnement = () => {} }) {
  const initialValues = {
    name_abonnement: abonnement.name_abonnement,
    description: abonnement.description,
    price: abonnement.price,
    abonnement_image: [],
    image_url: abonnement.image_url,
  };

  const token = useSelector((state) => state.token) || "";
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notify = useToast();

  const editAbonnement = async () => {
    try {
      const validated = await modifyAbonnementValidationSchema.validate(values, { abortEarly: false });

      const formData = new FormData();

      formData.append("name_abonnement", validated.name_abonnement);
      formData.append("description", validated.description);
      formData.append("price", validated.price);
      formData.append("image_url", abonnement.image_url);

      validated.abonnement_image.forEach((image) => {
        formData.append("abonnement_image", image);
      });

      const response = await fetch(`/api/abonnement/${abonnement.id}`, {
        method: "PATCH",
        headers: { Authorization: "Bearer " + token },
        body: formData,
      });

      const saved = await response.json();

      if (saved.code === 500) {
        notify("error", saved.error);
      }

      if (saved.code === 403) {
        notify("error", saved.error);
        dispatch(setLogout());
        navigate("/identification");
      }

      if (saved) {
        notify("success", "Abonnement modifié avec succès");
        setClose();
        reloadAbonnement();
      }
    } catch (error) {
      const errors = error.inner.reduce((acc, error) => {
        return { ...acc, [error.path]: error.message };
      }, {});

      setErrors(errors);
    }
  };

  const handleModifySubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    editAbonnement();
    setErrors({});
  };

  return (
    <div className="containerForm">
      <ButtonClose handleClick={() => setClose()} />
      <h2>Modifier un Abonnement :</h2>
      <AbonnementForm abonnement={abonnement} values={values} setValues={setValues} errors={errors} handleSubmit={(e) => handleModifySubmit(e)} />
    </div>
  );
}

export default EditAbonnement;
