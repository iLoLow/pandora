import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AnnonceForm.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import * as yup from "yup";
import Dropzone from "react-dropzone";

function AnnonceForm() {
  const initialValues = {
    title: undefined,
    description: undefined,
    image: undefined,
  };

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { user_id } = useSelector((state) => state.user) || "";
  const token = useSelector((state) => state.token) || "";

  const annonceValidationSchema = yup.object().shape({
    title: yup
      .string()
      .trim()
      .required("Veuillez renseigner un titre.")
      .matches(/^[a-zA-Z0-9\s]*$/, "Les caractères spéciaux ne sont pas autorisés."),
    description: yup
      .string()
      .trim()
      .required("Veuillez renseigner une description.")
      .matches(/^[a-zA-Z0-9\s'",.;()#@€]*$/, "Les caractères spéciaux ne sont pas autorisés sauf ', ., ;, (, ), #, @, €'."),
    image: yup
      .mixed()
      .test("fileFormat", "Le fichier doit être au format jpg, jpeg ou png", (value) => {
        return value && ["image/jpg", "image/jpeg", "image/png", "image/gif"].includes(value.type);
      })
      .test("fileSize", "Le fichier est trop volumineux, taille maximum de 10Mo.", (value) => {
        return value && value.size <= 10000000;
      })
      .required("Veuillez choisir une image."),
  });

  const createAnnonce = async () => {
    try {
      console.log(values);
      const validatedAnnonces = await annonceValidationSchema.validate(values, { abortEarly: false });

      const formData = new FormData();

      for (let value in validatedAnnonces) {
        formData.append(value, validatedAnnonces[value]);
      }

      formData.append("image_url", "/assets/" + values.image.name);
      formData.append("user_id", user_id);

      const savedAnnonceResponse = await fetch("/api/annonces", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const savedAnnonce = await savedAnnonceResponse.json();

      if (savedAnnonce) {
        //navigate("/annonces");
      }
    } catch (error) {
      console.log(error);
      const errors = error.inner.reduce((acc, error) => {
        return { ...acc, [error.path]: error.message };
      }, {});

      setErrors(errors);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    createAnnonce();
    setErrors({});
  };

  return (
    <form className="formAnnonce" method="POST" onSubmit={(e) => handleSubmit(e)}>
      <form-group>
        <label htmlFor="title">Titre</label>
        <input type="text" name="title" id="title" value={values.title} onChange={(e) => setValues({ ...values, title: e.target.value })} />
        {errors.title && <small className="errorSmall">{errors.title}</small>}
      </form-group>
      <form-group>
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          id="description"
          cols="30"
          rows="10"
          value={values.description}
          onChange={(e) => setValues({ ...values, description: e.target.value })}
        ></textarea>
        {errors.description && <small className="errorSmall">{errors.description}</small>}
      </form-group>
      <Dropzone multiple={false} onDrop={(acceptedFiles) => setValues({ ...values, image: acceptedFiles[0] })}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} className="dropzone">
            <div className={errors.image ? "zone zone-error" : "zone"}>
              <input {...getInputProps()} />
              {errors.image ? (
                <small className="errorSmall">{errors.image}</small>
              ) : values.image ? (
                <p>Image choisie : {values.image.name}</p>
              ) : (
                <p>Glissez-déposez une image ici, ou cliquez pour sélectionner une image.</p>
              )}
            </div>
          </div>
        )}
      </Dropzone>
      <button type="submit">Créer</button>
    </form>
  );
}

export default AnnonceForm;
