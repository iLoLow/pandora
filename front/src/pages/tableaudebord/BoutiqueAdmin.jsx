import { useDispatch } from "react-redux";
import FormBoutique from "../../components/FormBoutique";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useToast from "../../hooks/useToast";

function BoutiqueAdmin() {
  const initialValues = {
    name: "",
    description: "",
    price: "",
    image: null,
    image_url: "",
  };

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const notify = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createboutique_item = async () => {
    try {
      const validatedboutique_item = await boutique_itemValidationSchema.validate(values, { abortEarly: false });

      const formData = new FormData();

      for (let value in validatedboutique_item) {
        formData.append(value, validatedboutique_item[value]);
      }

      const savedboutique_itemResponse = await fetch("/api/boutique", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const savedboutique_item = await savedboutique_itemResponse.json();

      if (savedboutique_item.code === 500) {
        notify("error", savedboutique_item.error);
      }

      if (savedboutique_item.code === 403) {
        notify("error", savedboutique_item.error);
        dispatch(setLogout());
        navigate("/connexion");
      }

      if (savedboutique_item.code === 201) {
        notify("success", savedboutique_item.message);
        setValues(initialValues);
      }
    } catch (error) {
      const newErrors = error.inner.reduce((acc, error) => {
        return { ...acc, [error.path]: error.message };
      }, {});

      setErrors(newErrors);
    }
  };

  const handleBoutique_ItemSubmit = (e) => {
    e.preventDefault();
    createboutique_item();
  };

  return (
    <div>
      <h2>Boutique</h2>
      <h3>Ajouter un article : </h3>
      <FormBoutique values={values} setValues={setValues} errors={errors} handleSubmit={(e) => handleBoutique_ItemSubmit(e)} />
    </div>
  );
}

export default BoutiqueAdmin;
//deux onglets pour la boutique , articles et formule d'abonnements.
