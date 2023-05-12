import { useState } from "react";
import useToast from "../../hooks/useToast";
import { bannerValidationSchema } from "../../utils/schemasValidation";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import BannerForm from "./BannerForm";
import { setLogout } from "../../state";
import { useNavigate } from "react-router-dom";

function AddBannerForm({ reload = () => {} }) {
  const token = useSelector((state) => state.token) || "";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    banner_image: null,
  });

  const [errors, setErrors] = useState({});
  const notify = useToast();

  const createBanner = async () => {
    try {
      const validatedBanner = await bannerValidationSchema.validate(values, { abortEarly: false });

      const formData = new FormData();

      formData.append("banner_image", validatedBanner.banner_image);

      const savedBannerResponse = await fetch("/api/banner", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const savedBanner = await savedBannerResponse.json();

      if (savedBanner.code === 500) {
        notify("error", savedBanner.error);
      }

      if (savedBanner.code === 403) {
        notify("error", savedBanner.error);
        dispatch(setLogout());
        navigate("/identification");
      }

      if (savedBanner) {
        notify("success", savedBanner.message);
        reload();
      }
    } catch (error) {
      console.log(error);
      if (error.inner) {
        const newErrors = {};
        error.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });
        setErrors(newErrors);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    createBanner();
  };

  return (
    <div className="containerForm">
      <h2>Ajouter un banner</h2>
      <BannerForm values={values} setValues={setValues} errors={errors} handleSubmit={(e) => handleSubmit(e)} />
    </div>
  );
}

export default AddBannerForm;
