import { useState } from "react";
import BoutiqueForm from "./BoutiqueForm";
import { addItemBoutiqueValidationSchema } from "../../utils/schemasValidation";
import { useSelector, useDispatch } from "react-redux";
import useToast from "../../hooks/useToast";
import { useNavigate } from "react-router-dom";

function AddBoutiqueForm({ setClose = () => {}, reloadBoutique = () => {} }) {
  const initialValues = {
    name_article: "",
    description: "",
    price: 0,
    type_vehicule: "",
    boutique_image: [],
  };

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

      formData.append("name_article", validatedItems.name_article);
      formData.append("description", validatedItems.description);
      formData.append("price", validatedItems.price);
      formData.append("type_vehicule", validatedItems.type_vehicule);

      validatedItems.boutique_image.forEach((image) => {
        formData.append("boutique_image", image);
      });

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
        navigate("/identification");
      }

      if (savedItem) {
        notify("success", savedItem.message);
        setValues(initialValues);
        reloadBoutique();
        setErrors({});
        setClose();
      }
    } catch (error) {
      const errors = error.inner.reduce((acc, err) => {
        return { ...acc, [err.path.split("[")[0]]: err.message };
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
