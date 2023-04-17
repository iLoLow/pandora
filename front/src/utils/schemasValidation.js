import * as yup from "yup";

// Validation du formulaire d'inscription
export const loginValidationSchema = yup.object().shape({
  email: yup.string().trim().email().required("Veuillez renseigner une adresse email valide."),
  password: yup.string().trim().required("Veuillez renseigner un mot de passe.").min(6, "Le mot de passe doit contenir au moins 6 caractères."),
});
export const registerValidationSchema = yup.object().shape({
  username: yup.string().trim().required("Veuillez renseigner votre nom d'utilisateur.").min(4, "Le nom d'utilisateur doit contenir au moins 4 caractères."),
  email: yup.string().trim().email().required("Veuillez renseigner une adresse email valide."),
  password: yup
    .string()
    .trim()
    .required("Veuillez renseigner un mot de passe")
    .matches(
      /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,30})/g,
      "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial."
    ),
  confirmPassword: yup
    .string()
    .trim()
    .required("Veuillez confirmer votre mot de passe.")
    .oneOf([yup.ref("password"), null], "Les mots de passe doivent correspondre"),
  avatar: yup
    .mixed()
    .test("fileFormat", "Le fichier doit être au format jpg, jpeg ou png", (value) => {
      return value && ["image/jpg", "image/jpeg", "image/png", "image/gif"].includes(value.type);
    })
    .test("fileSize", "Le fichier est trop volumineux, taille maximum de 2Mo.", (value) => {
      return value && value.size <= 2000000;
    })
    .required("Veuillez choisir une image."),
});
export const updateProfilValidationSchema = yup.object().shape({
  username: yup.string().trim().required("Veuillez renseigner votre nom d'utilisateur.").min(4, "Le nom d'utilisateur doit contenir au moins 4 caractères."),
  email: yup.string().trim().email().required("Veuillez renseigner une adresse email valide."),
  password: yup
    .string()
    .trim()
    .nullable(true)
    .matches(
      /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,30})/g,
      "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial."
    ),
  confirmPassword: yup
    .string()
    .trim()
    .nullable(true)
    .test("oneOf", "Veuillez saisir un mot de passe identique.", function (value) {
      return value === "" || value === this.parent.password;
    }),
  avatar: yup
    .mixed()
    .nullable(true)
    .test("fileFormat", "Le fichier doit être au format jpg, jpeg ou png", (value) => {
      return value === null || ["image/jpg", "image/jpeg", "image/png", "image/gif"].includes(value.type);
    })
    .test("fileSize", "Le fichier est trop volumineux, taille maximum de 2Mo.", (value) => {
      return value === null || value.size <= 2000000;
    }),
});

export const annonceValidationSchema = yup.object().shape({
  title: yup
    .string()
    .trim()
    .required("Veuillez renseigner un titre.")
    .matches(/^[a-zA-Z0-9\s]*$/, "Les caractères spéciaux ne sont pas autorisés."),
  description: yup
    .string()
    .trim()
    .required("Veuillez renseigner une description.")
    .matches(/^[^<>]*$/, "Les caractères spéciaux sont autorisés sauf '<>'."),
  image: yup
    .mixed()
    .test("fileFormat", "Le fichier doit être au format jpg, jpeg, gif ou png", (value) => {
      return value && ["image/jpg", "image/jpeg", "image/png", "image/gif"].includes(value.type);
    })
    .test("fileSize", "Le fichier est trop volumineux, taille maximum de 10Mo.", (value) => {
      return value && value.size <= 10000000;
    })
    .required("Veuillez ajouter une image."),
});

export const annonceModifyValidationSchema = yup.object().shape({
  title: yup
    .string()
    .trim()
    .required("Veuillez renseigner un titre.")
    .matches(/^[a-zA-Z0-9\s]*$/, "Les caractères spéciaux ne sont pas autorisés."),
  description: yup
    .string()
    .trim()
    .required("Veuillez renseigner une description.")
    .matches(/^[^<>]*$/, "Les caractères spéciaux ne sont pas autorisés sauf ', ., ;, (, ), #, @, €'."),
  image: yup
    .mixed()
    .nullable(true)
    .test("fileFormat", "Le fichier doit être au format jpg, jpeg ou png", (value) => {
      return value === null || ["image/jpg", "image/jpeg", "image/png", "image/gif"].includes(value.type);
    })
    .test("fileSize", "Le fichier est trop volumineux, taille maximum de 10Mo.", (value) => {
      return value === null || value.size <= 10000000;
    }),
});

export const addItemBoutiqueValidationSchema = yup.object().shape({
  name_article: yup
    .string()
    .trim()
    .required("Veuillez renseigner un nom.")
    .matches(/^[a-zA-Z0-9\s]*$/, "Les caractères spéciaux ne sont pas autorisés."),
  description: yup
    .string()
    .trim()
    .required("Veuillez renseigner une description.")
    .matches(/^[^<>]*$/, "Les caractères spéciaux ne sont pas autorisés sauf ', ., ;, (, ), #, @, €'."),
  type_vehicule: yup
    .string()
    .trim()
    .required("Veuillez renseigner un type de véhicule.")
    .matches(/^[a-zA-Z0-9\s]*$/, "Les caractères spéciaux ne sont pas autorisés."),
  price: yup.number().required("Veuillez renseigner un prix.").positive("Le prix doit être positif."),
  image: yup
    .mixed()
    .test("fileFormat", "Le fichier doit être au format jpg, jpeg ou png", (value) => {
      return value && ["image/jpg", "image/jpeg", "image/png", "image/gif"].includes(value.type);
    })
    .test("fileSize", "Le fichier est trop volumineux, taille maximum de 10Mo.", (value) => {
      return value && value.size <= 10000000;
    }),
});

export const modifyItemBoutiqueValidationSchema = yup.object().shape({
  name_article: yup
    .string()
    .trim()
    .required("Veuillez renseigner un nom.")
    .matches(/^[a-zA-Z0-9\s]*$/, "Les caractères spéciaux ne sont pas autorisés."),
  description: yup
    .string()
    .trim()
    .required("Veuillez renseigner une description.")
    .matches(/^[^<>]*$/, "Les caractères spéciaux ne sont pas autorisés sauf ', ., ;, (, ), #, @, €'."),
  type_vehicule: yup
    .string()
    .trim()
    .required("Veuillez renseigner un type de véhicule.")
    .matches(/^[a-zA-Z0-9\s]*$/, "Les caractères spéciaux ne sont pas autorisés."),
  price: yup.number().required("Veuillez renseigner un prix.").positive("Le prix doit être positif."),
  image: yup
    .mixed()
    .nullable(true)
    .test("fileFormat", "Le fichier doit être au format jpg, jpeg ou png", (value) => {
      return value === null || ["image/jpg", "image/jpeg", "image/png", "image/gif"].includes(value.type);
    })
    .test("fileSize", "Le fichier est trop volumineux, taille maximum de 10Mo.", (value) => {
      return value === null || value.size <= 10000000;
    }),
});
