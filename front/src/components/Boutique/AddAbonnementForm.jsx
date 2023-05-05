import { useState } from "react";
import { addAbonnementValidationSchema } from "../../utils/schemasValidation";
import { useSelector, useDispatch } from "react-redux";
import useToast from "../../hooks/useToast";
import { useNavigate } from "react-router-dom";
import AbonnementForm from "./AbonnementForm";

function AddAbonnementForm({ setClose = () => {}, reloadAbonnement = () => {} }) {
  const initialValues = {
    name_abonnement: "",
    description: "",
    price: 0,
    abonnement_image: [],
  };

  const token = useSelector((state) => state.token) || "";
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const notify = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createAbonnement = async () => {
    try {
      const validatedItems = await addAbonnementValidationSchema.validate(values, { abortEarly: false });

      const formData = new FormData();

      formData.append("name_abonnement", validatedItems.name_abonnement);
      formData.append("description", validatedItems.description);
      formData.append("price", validatedItems.price);

      validatedItems.abonnement_image.forEach((image) => {
        formData.append("abonnement_image", image);
      });

      const response = await fetch("/api/abonnement", {
        method: "POST",
        headers: { Authorization: "Bearer " + token },
        body: formData,
      });

      const savedItem = await response.json();

      if (savedItem.code === 500) {
        notify("error", savedItem.error);
      }

      if (savedItem.code === 403) {
        notify("error", savedItem.error);
        dispatch(setLogout());
        navigate("/identification");
      }

      if (savedItem) {
        notify("success", savedItem.message);
        setValues(initialValues);
        reloadAbonnement();
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

  const handleAbonnementSubmit = (e) => {
    e.preventDefault();
    createAbonnement();
  };

  return (
    <div className="containerForm">
      <h2>Ajouter un Abonnement : </h2>
      <AbonnementForm values={values} setValues={setValues} errors={errors} handleSubmit={(e) => handleAbonnementSubmit(e)} />
    </div>
  );
}

export default AddAbonnementForm;
