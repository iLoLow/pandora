import EquipeForm from "./EquipeForm";
import { useState } from "react";
import { equipeValidationSchema } from "../../utils/schemasValidation";
import { useDispatch, useSelector } from "react-redux";
import useToast from "../../hooks/useToast";
import { useNavigate } from "react-router-dom";
import ButtonClose from "../Others/ButtonClose";

function AddEquipeForm({ setClose = () => {}, reloadEquipes = () => {} }) {
  const initialValues = {
    pseudo_discord: "",
    nom_prenom_rp: "",
    fonction: "",
    description: "",
    avatar_image: null,
  };

  const token = useSelector((state) => state.token) || "";
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const notify = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const createEquipe = async () => {
    try {
      const validatedEquipe = await equipeValidationSchema.validate(values, { abortEarly: false });

      console.table(validatedEquipe);

      const formData = new FormData();

      for (let value in validatedEquipe) {
        formData.append(value, validatedEquipe[value]);
      }

      const response = await fetch("/api/admin/team", {
        method: "POST",
        headers: { Authorization: "Bearer " + token },
        body: formData,
      });

      const savedEquipe = await response.json();

      if (savedEquipe.code === 500) {
        notify("error", savedEquipe.error);
      }

      if (savedEquipe.code === 403) {
        notify("error", savedEquipe.error);
        dispatch(setLogout());
        navigate("/identification");
      }

      if (savedEquipe) {
        notify("success", savedEquipe.message);
        setValues(initialValues);

        reloadEquipes();
        setClose();
        setErrors({});
      }
    } catch (error) {
      const errors = error.inner.reduce((acc, error) => {
        return { ...acc, [error.path]: error.message };
      }, {});
      setErrors(errors);
    }
  };

  const handleAddEquipeSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    createEquipe();
  };

  return (
    <div className="containerForm">
      <ButtonClose handleClick={() => setClose()} />

      <h2>Ajouter Un Membre :</h2>
      <EquipeForm values={values} setValues={setValues} errors={errors} handleSubmit={handleAddEquipeSubmit} />
    </div>
  );
}

export default AddEquipeForm;
