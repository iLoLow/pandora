import "../styles/Identification.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../state";
import * as yup from "yup";
import Dropzone from "react-dropzone";
import { registerValidationSchema } from "../utils/schemasValidation";

function Identification() {
  document.title = "Pandora RP";

  let initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar: null,
  };

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [formType, setFormType] = useState("login"); // login ou signUp
  const isLogin = formType === "login";
  const isSignup = formType === "signUp";
  const navigate = useNavigate();
  const dispatch = useDispatch();

  

  // Enregistrement d'un nouvel utilisateur
  const register = async () => {
    try {
      const validatedFormdata = await registerValidationSchema.validate(values, { abortEarly: false });

      const formData = new FormData();

      for (const value in validatedFormdata) {
        formData.append(value, validatedFormdata[value]);
      }

      formData.append("avatar_url", "/assets/" + values.avatar.name);

      const savedUserResponse = await fetch("/api/auth/register", {
        method: "POST",
        body: formData,
      });

      const savedUser = await savedUserResponse.json();

      if (savedUser) {
        setFormType("login");
      }
    } catch (e) {
      const errors = e.inner.reduce((acc, error) => {
        return { ...acc, [error.path]: error.message };
      }, {});

      setErrors(errors);
    }
  };

  const loginValidationSchema = yup.object().shape({
    email: yup.string().trim().email().required("Veuillez renseigner une adresse email valide."),
    password: yup.string().trim().required("Veuillez renseigner un mot de passe.").min(6, "Le mot de passe doit contenir au moins 6 caractères."),
  });

  // Connexion d'un utilisateur
  const login = async () => {
    try {
      const user = {
        email: values.email,
        password: values.password,
      };

      const validatedUser = await loginValidationSchema.validate(user, { abortEarly: false });

      const loggedInResponse = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedUser),
      });

      const loggedInUser = await loggedInResponse.json();

      if (loggedInUser) {
        dispatch(setLogin({ user: loggedInUser.user, token: loggedInUser.token }));
        navigate("/tableaudebord");
      }
    } catch (e) {
      const errors = e.inner.reduce((acc, error) => {
        return { ...acc, [error.path]: error.message };
      }, {});
      setErrors(errors);
    }
  };

  // Gestion de la soumission du formulaire pour l'inscription ou la connexion
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formType === "signUp") register();
    if (formType === "login") login();
  };

  return (
    <section className="sectionForm">
      <h2>{formType === "login" ? "Connexion" : "Enregistrement"}</h2>
      <form className="formIdentification" method="POST" onSubmit={handleSubmit}>
        {formType === "signUp" && (
          <form-group>
            <label>Nom d'utilisateur :</label>
            <input type="text" value={values.username} onChange={(e) => setValues({ ...values, username: e.target.value })} />
            {errors.username && <small className="errorSmall">{errors.username}</small>}
          </form-group>
        )}
        <form-group>
          <label>Email :</label>
          <input type="email" value={values.email} onChange={(e) => setValues({ ...values, email: e.target.value })} />
          {errors.email && <small className="errorSmall">{errors.email}</small>}
        </form-group>
        <form-group>
          <label>Mot de passe :</label>
          <input autoComplete="off" type="password" value={values.password} onChange={(e) => setValues({ ...values, password: e.target.value })} />
          {errors.password && <small className="errorSmall">{errors.password}</small>}
        </form-group>
        {isSignup && (
          <>
            <form-group>
              <label>Confirmation du mot de passe :</label>
              <input autoComplete="off" type="password" value={values.confirmPassword} onChange={(e) => setValues({ ...values, confirmPassword: e.target.value })} />
              {errors.confirmPassword && <small className="errorSmall">{errors.confirmPassword}</small>}
            </form-group>
            <Dropzone multiple={false} onDrop={(acceptedFiles) => setValues({ ...values, avatar: acceptedFiles[0] })}>
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()} className="dropzone">
                  <div className={errors.avatar ? "zone zone-error" : "zone"}>
                    <input {...getInputProps()} />
                    {errors.avatar ? (
                      <small className="errorSmall">{errors.avatar}</small>
                    ) : values.avatar ? (
                      <p>Image choisie : {values.avatar.name}</p>
                    ) : (
                      <p>Glissez-déposez votre avatar, ou cliquez pour sélectionner votre avatar.</p>
                    )}
                  </div>
                </div>
              )}
            </Dropzone>
          </>
        )}
        <button type="submit">{isLogin ? "Se connecter" : "S'inscrire"}</button>
      </form>
      <div
        className="linkBtn"
        onClick={() => {
          setErrors({});
          setFormType(isLogin ? "signUp" : "login");
        }}
      >
        {isLogin ? <p>Vous n'avez pas de compte ? Inscrivez-vous</p> : <p>Vous avez déjà un compte ? Connectez-vous</p>}
      </div>
    </section>
  );
}

export default Identification;
