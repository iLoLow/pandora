import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogout } from "../state";
import useToast from "../hooks/useToast";
import BoutiqueForm from "./BoutiqueForm";
import { modifyItemBoutiqueValidationSchema } from "../utils/schemasValidation";

function EditBoutiqueItem({ item, setClose = () => {}, reload = () => {} }) {
  const initialValues = {
    name_article: item.name_article,
    description: item.description,
    price: item.price,
    type_vehicule: item.type_vehicule,
    boutique_image: null,
    image_url: item.image_url,
  };

  const token = useSelector((state) => state.token) || "";
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notify = useToast();

  const editItem = async () => {
    try {
      const validated = await modifyItemBoutiqueValidationSchema.validate(values, { abortEarly: false });

      const formData = new FormData();

      for (let value in validated) {
        formData.append(value, validated[value]);
      }

      const response = await fetch("/api/boutique/" + item.id, {
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
        reload();
        notify("success", saved.message);
        setClose();
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
    editItem();
    setErrors({});
  };

  return (
    <div className="containerForm">
      <h2>Modifier un article :</h2>
      <BoutiqueForm boutique={item} values={values} setValues={setValues} errors={errors} handleSubmit={(e) => handleModifySubmit(e)} />
    </div>
  );
}

export default EditBoutiqueItem;
