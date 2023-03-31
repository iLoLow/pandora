import { useState } from "react";
import AnnonceForm from "./AnnonceForm";
import { annonceModifyValidationSchema } from "../utils/schemasValidation";
import { useSelector } from "react-redux";

function ModifyAnnonceForm({ annonce, reloadAnnonces = () => {} }) {
  const initialValues = {
    title: annonce.title,
    description: annonce.description,
    image: null,
    image_url: annonce.image_url,
  };

  const token = useSelector((state) => state.token) || "";
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

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

      if (savedAnnonce) {
        reloadAnnonces();
        //navigate("/tableaudebord/annonces");
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
    editAnnonce();
    setErrors({});
  };

  return (
    <div className="annonceFormTitle">
      <h2>Modifier une annonce</h2>
      <AnnonceForm values={values} setValues={setValues} errors={errors} handleSubmit={(e) => handleModifyAnnonceSubmit(e)} />;
    </div>
  );
}

export default ModifyAnnonceForm;
