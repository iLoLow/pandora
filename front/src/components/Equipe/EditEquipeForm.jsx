import { useState } from "react";
import EquipeForm from "./EquipeForm";
import { modifyEquipeValidationSchema } from "../../utils/schemasValidation";
import { useDispatch, useSelector } from "react-redux";
import useToast from "../../hooks/useToast";
import { useNavigate } from "react-router-dom";
import { setLogout } from "../../state";
import ButtonClose from "../Others/ButtonClose";

function EditEquipeForm({ equipe, setClose = () => {}, reloadEquipes = () => {} }) {
  const initialValues = {
    pseudo_discord: equipe.pseudo_discord,
    nom_prenom_rp: equipe.nom_prenom_rp,
    fonction: equipe.fonction,
    description: equipe.description,
    avatar_image: null,
    avatar_url: equipe.avatar_url,
  };

  const token = useSelector((state) => state.token) || "";
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const notify = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const editEquipe = async () => {
    try {
      const validatedEquipe = await modifyEquipeValidationSchema.validate(values, { abortEarly: false });

      const formData = new FormData();

      for (let value in validatedEquipe) {
        formData.append(value, validatedEquipe[value]);
      }

      const response = await fetch("/api/admin/team/" + equipe.id, {
        method: "PATCH",
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
        setValues(equipe);
        reloadEquipes();
        setClose();
      }
    } catch (error) {
      const errors = error.inner.reduce((acc, error) => {
        return { ...acc, [error.path]: error.message };
      }, {});
      setErrors(errors);
    }
  };

  const handleEditEquipe = (e) => {
    e.preventDefault();
    e.stopPropagation();
    editEquipe();
    setErrors({});
  };

  return (
    <div className="containerForm">
      <ButtonClose handleClick={() => setClose()} />
      <h2>Modifier Un Membre :</h2>
      <EquipeForm equipe={equipe} values={values} setValues={setValues} errors={errors} setErrors={setErrors} handleSubmit={(e) => handleEditEquipe(e)} setClose={setClose} />
    </div>
  );
}

export default EditEquipeForm;
