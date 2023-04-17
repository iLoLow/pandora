import { useState } from "react";
import { useSelector } from "react-redux";
import Dropzone from "react-dropzone";
import { updateProfilValidationSchema } from "../utils/schemasValidation";
import Button from "../components/Button";
import useToast from "../hooks/useToast";

function UpdateUserForm({ user, isAdministrator, handleReload = () => {} }) {
  const token = useSelector((state) => state.token);

  let initialValues = {
    username: user.username,
    email: user.email,
    password: undefined,
    confirmPassword: undefined,
    avatar: null,
    avatar_url: user.avatar_url,
    is_admin: user.is_admin,
  };

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const notify = useToast();

  // Mise à jour du profil de l'utilisateur
  const updateUser = async () => {
    try {
      const validatedFormdata = await updateProfilValidationSchema.validate(values, { abortEarly: false });

      const formData = new FormData();

      for (const value in validatedFormdata) {
        formData.append(value, validatedFormdata[value]);
      }

      const savedUserResponse = await fetch("/api/users/" + user.user_id, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const savedUser = await savedUserResponse.json();

      if (savedUser.code === 400 || savedUser.code === 500) {
        notify("error", savedUser.error);
        return;
      }

      if (savedUser) {
        notify("success", savedUser.message);
        handleReload();
      }
    } catch (e) {
      const errors = e.inner.reduce((acc, error) => {
        return { ...acc, [error.path]: error.message };
      }, {});

      setErrors(errors);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateUser();
  };

  return (
    <section className="sectionForm">
      <h2>Modification du profil</h2>
      <p className="warning">Attention !!! Toutes modifications entraînera une déconnexion.</p>
      <form className="formIdentification" method="POST" onSubmit={handleSubmit}>
        <form-group>
          <label>Nom d'utilisateur :</label>
          <input autoComplete="username" type="text" value={values.username} onChange={(e) => setValues({ ...values, username: e.target.value })} />
          {errors.username && <small className="errorSmall">{errors.username}</small>}
        </form-group>
        <form-group>
          <label>Email :</label>
          <input autoComplete="username" type="email" value={values.email} onChange={(e) => setValues({ ...values, email: e.target.value })} />
          {errors.email && <small className="errorSmall">{errors.email}</small>}
        </form-group>
        <form-group>
          <label>Nouveau Mot de passe :</label>
          <input
            autoComplete="new-password"
            type="password"
            value={values.password}
            onChange={(e) => setValues({ ...values, password: e.target.value === "" ? undefined : e.target.value })}
            placeholder="Laisser vide pour ne pas modifier."
          />
          {errors.password && <small className="errorSmall">{errors.password}</small>}
        </form-group>
        <>
          <form-group>
            <label>Confirmation du Nouveau Mot de Passe :</label>
            <input
              autoComplete="new-password"
              type="password"
              value={values.confirmPassword}
              onChange={(e) => setValues({ ...values, confirmPassword: e.target.value === "" ? undefined : e.target.value })}
              placeholder="Laisser vide pour ne pas modifier."
            />
            {errors.confirmPassword && <small className="errorSmall">{errors.confirmPassword}</small>}
          </form-group>

          <Dropzone multiple={false} onDrop={(acceptedFiles) => setValues({ ...values, avatar: acceptedFiles[0], avatar_url: "/assets/" + acceptedFiles[0].name })}>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()} className="dropzone">
                <div className={errors.avatar ? "zone zone-error" : "zone"}>
                  <input {...getInputProps()} />
                  {errors.avatar ? (
                    <small className="errorSmall">{errors.avatar}</small>
                  ) : values.avatar ? (
                    <p>Image choisie : {values.avatar.name}</p>
                  ) : values.avatar_url ? (
                    <p>Image choisie : {values.avatar_url.split("/assets/")[1]}</p>
                  ) : (
                    <p>Glissez-déposez votre avatar, ou cliquez pour sélectionner votre avatar.</p>
                  )}
                </div>
              </div>
            )}
          </Dropzone>
          {isAdministrator && (
            <form-group>
              <div className="formCheck">
                <label>Promouvoir en Administrateur: </label>
                <input type="checkbox" value={1} checked={values.is_admin} onChange={(e) => setValues({ ...values, is_admin: Number(e.target.checked) })} />
              </div>
            </form-group>
          )}
        </>
        <Button type="submit" children="Valider" />
      </form>
    </section>
  );
}

export default UpdateUserForm;
