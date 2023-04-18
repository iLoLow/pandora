import "../styles/Identification.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../state";
import Dropzone from "react-dropzone";
import { registerValidationSchema, loginValidationSchema } from "../utils/schemasValidation";
import Button from "../components/Button";
import useToast from "../hooks/useToast";

function Identification() {
  let initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar_image: null,
  };

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [formType, setFormType] = useState("login"); // login ou signUp
  const isLogin = formType === "login";
  const isSignup = formType === "signUp";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const notify = useToast();

  // Enregistrement d'un nouvel utilisateur
  const register = async () => {
    try {
      const validatedFormdata = await registerValidationSchema.validate(values, { abortEarly: false });

      const formData = new FormData();

      for (const value in validatedFormdata) {
        formData.append(value, validatedFormdata[value]);
      }

      const savedUserResponse = await fetch("/api/auth/register", {
        method: "POST",
        body: formData,
      });

      const savedUser = await savedUserResponse.json();

      if (savedUser.code === 400 || savedUser.code === 429 || savedUser.code === 500) {
        notify("error", savedUser.error);
        return;
      }

      if (savedUser) {
        setFormType("login");
        notify("success", savedUser.message);
      }
    } catch (e) {
      const errors = e.inner.reduce((acc, error) => {
        return { ...acc, [error.path]: error.message };
      }, {});

      setErrors(errors);
    }
  };

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

      if (loggedInUser.code === 400 || loggedInUser.code === 429 || loggedInUser.code === 500) {
        notify("error", loggedInUser.error);
        return;
      }

      if (loggedInUser) {
        dispatch(setLogin({ user: loggedInUser.user, token: loggedInUser.token }));
        navigate("/tableaudebord");
        notify("success", loggedInUser.message);
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
            <input autoComplete="username" type="text" value={values.username} onChange={(e) => setValues({ ...values, username: e.target.value })} />
            {errors.username && <small className="errorSmall">{errors.username}</small>}
          </form-group>
        )}
        <form-group>
          <label>Email :</label>
          <input autoComplete="username" type="email" value={values.email} onChange={(e) => setValues({ ...values, email: e.target.value })} />
          {errors.email && <small className="errorSmall">{errors.email}</small>}
        </form-group>
        <form-group>
          <label>Mot de passe :</label>
          <input autoComplete="new-password" type="password" value={values.password} onChange={(e) => setValues({ ...values, password: e.target.value })} />
          {errors.password && <small className="errorSmall">{errors.password}</small>}
        </form-group>
        {isSignup && (
          <>
            <form-group>
              <label>Confirmation du mot de passe :</label>
              <input autoComplete="new-password" type="password" value={values.confirmPassword} onChange={(e) => setValues({ ...values, confirmPassword: e.target.value })} />
              {errors.confirmPassword && <small className="errorSmall">{errors.confirmPassword}</small>}
            </form-group>
            <Dropzone multiple={false} onDrop={(acceptedFiles) => setValues({ ...values, avatar_image: acceptedFiles[0] })}>
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()} className="dropzone">
                  <div className={errors.avatar ? "zone zone-error" : "zone"}>
                    <input {...getInputProps()} />
                    {errors.avatar_image ? (
                      <small className="errorSmall">{errors.avatar_image}</small>
                    ) : values.avatar_image ? (
                      <p>Image choisie : {values.avatar_image.name}</p>
                    ) : (
                      <p>Glissez-déposez votre avatar, ou cliquez pour sélectionner votre avatar.</p>
                    )}
                  </div>
                </div>
              )}
            </Dropzone>
          </>
        )}
        <Button type="submit" children={isLogin ? "Se connecter" : "S'inscrire"} />
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
