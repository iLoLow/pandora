import { useState } from "react";
import AnnonceForm from "./AnnonceForm";
import { annonceModifyValidationSchema } from "../../utils/schemasValidation";
import { useSelector } from "react-redux";
import useToast from "../../hooks/useToast";
import { useDispatch } from "react-redux";
import { setLogout } from "../../state";
import { useNavigate } from "react-router-dom";
import ButtonClose from "../Others/ButtonClose";

function ModifyAnnonceForm({ annonce, setClose = () => {}, reloadAnnonces = () => {} }) {
  const initialValues = {
    title: annonce.title,
    description: annonce.description,
    annonce_image: null,
    image_url: annonce.image_url,
  };

  const token = useSelector((state) => state.token) || "";
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notify = useToast();

  const editAnnonce = async () => {
    try {
      const validatedAnnonces = await annonceModifyValidationSchema.validate(values, { abortEarly: false });

      const formData = new FormData();

      for (let value in validatedAnnonces) {
        formData.append(value, validatedAnnonces[value]);
      }

      const savedAnnonceResponse = await fetch("/api/annonces/" + annonce.id, {
        method: "PATCH",
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
        reloadAnnonces();
        notify("success", savedAnnonce.message);
        setClose();
      }
    } catch (error) {
      const errors = error.inner.reduce((acc, error) => {
        return { ...acc, [error.path]: error.message };
      }, {});

      setErrors(errors);
    }
  };

  const handleModifyAnnonceSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    editAnnonce();
    setErrors({});
  };

  return (
    <div className="annonceFormTitle">
      <div className="containerForm">
        <ButtonClose handleClick={() => setClose()} />
        <h2>Modifier une annonce :</h2>
        <AnnonceForm annonce={annonce} values={values} setValues={setValues} errors={errors} handleSubmit={(e) => handleModifyAnnonceSubmit(e)} />
      </div>
    </div>
  );
}

export default ModifyAnnonceForm;
