import { useState } from "react";
import BoutiqueForm from "./BoutiqueForm";
import { addItemBoutiqueValidationSchema } from "../utils/schemasValidation";
import { useSelector, useDispatch } from "react-redux";
import useToast from "../hooks/useToast";
import { useNavigate } from "react-router-dom";

function AddBoutiqueForm({ setClose = () => {}, reloadBoutique = () => {} }) {
  const initialValues = {
    name_article: "",
    description: "",
    price: 0,
    type_vehicule: "",
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

  const createBoutiqueItem = async () => {
    try {
      const validatedItems = await addItemBoutiqueValidationSchema.validate(values, { abortEarly: false });

      const formData = new FormData();

      for (let value in validatedItems) {
        formData.append(value, validatedItems[value]);
      }

      const response = await fetch("/api/boutique", {
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
        navigate("/connexion");
      }

      if (savedItem) {
        notify("success", savedItem.message);
        setValues(initialValues);
        reloadBoutique();
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
  const handleBoutiqueItemSubmit = (e) => {
    e.preventDefault();
    createBoutiqueItem();
  };

  return (
    <div className="containerForm">
      <h2>Ajouter un article : </h2>

      <BoutiqueForm values={values} setValues={setValues} errors={errors} handleSubmit={(e) => handleBoutiqueItemSubmit(e)} />
    </div>
  );
}

export default AddBoutiqueForm;
