import { useState } from "react";
import AnnonceForm from "./AnnonceForm";
import { annonceValidationSchema } from "../utils/schemasValidation";
import { useSelector, useDispatch } from "react-redux";
import useToast from "../hooks/useToast";
import { useNavigate } from "react-router-dom";

function AddAnnonceForm({ setClose= () => {}, reloadAnnonces = () => {} }) {
  const initialValues = {
    title: "",
    description: "",
    image: null,
    image_url: "",
  };



  const { user_id } = useSelector((state) => state.user) || "";
  const token = useSelector((state) => state.token) || "";
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const notify = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createAnnonce = async () => {
    try {
      const validatedAnnonces = await annonceValidationSchema.validate(values, { abortEarly: false });

      const formData = new FormData();

      for (let value in validatedAnnonces) {
        formData.append(value, validatedAnnonces[value]);
      }

      formData.append("user_id", user_id);

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
