import { useState } from "react";
import { useSelector } from "react-redux";
import useToast from "../../hooks/useToast";
import { useDispatch } from "react-redux";
import { setLogout } from "../../state";
import { modifyBannerValidationSchema } from "../../utils/schemasValidation";
import { useNavigate } from "react-router-dom";
import BannerForm from "./BannerForm";

function ModifyBannerForm({ banner, reload = () => {} }) {
  const token = useSelector((state) => state.token) || "";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    banner_image: null,
  });

  const [errors, setErrors] = useState({});
  const notify = useToast();

  const modifyBanner = async () => {
    try {
      const validatedBanner = await modifyBannerValidationSchema.validate(values, { abortEarly: false });

      const formData = new FormData();

      formData.append("banner_image", validatedBanner.banner_image);
      formData.append("image_url", banner.image_url);

      const savedBannerResponse = await fetch("/api/banner/" + banner.id, {
        method: "PATCH",
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
    modifyBanner();
  };

  return (
    <div className="containerForm">
      <h2>Modification du Banner</h2>
      <BannerForm banner={banner} values={values} setValues={setValues} errors={errors} handleSubmit={(e) => handleSubmit(e)} />
    </div>
  );
}

export default ModifyBannerForm;
