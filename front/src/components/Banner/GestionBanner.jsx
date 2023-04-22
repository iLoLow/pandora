import AddBannerForm from "../Banner/AddBannerForm";
import ModifyBannerForm from "../Banner/ModifyBannerForm";
import { useState, useEffect } from "react";
import "../../styles/banner/GestionBanner.css";
import { useSelector } from "react-redux";
import useToast from "../../hooks/useToast";

function GestionBanner() {
  const [banner, setBanner] = useState([]);

  const token = useSelector((state) => state.token);
  const notify = useToast();

  const getBanner = async () => {
    try {
      const response = await fetch("/api/banner");
      const data = await response.json();

      setBanner(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteBanner = async () => {
    try {
      if (confirm("Voulez vous supprimer le banner ?")) {
        const response = await fetch("/api/banner/" + banner[0].id, {
          method: "DELETE",
          headers: { Authorization: "Bearer " + token },
        });
        const data = await response.json();

        if (data.code === 500 || data.code === 403) {
          notify("error", data.error);
        }

        if (data) {
          notify("success", data.message);
          getBanner();
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getBanner();
  }, []);

  return (
    <div>
      <h2>Gestion Du Banner</h2>
      {banner.length === 0 ? <AddBannerForm reload={() => getBanner()} /> : <ModifyBannerForm banner={banner[0]} reload={() => getBanner()} />}
      {banner.length > 0 && (
        <div className="bannerWrapper">
          <div>
            <img src={banner[0].image_url} alt="banner" />
          </div>
          <div className="infosBanner">
            <h3>Pour supprimer le banner existant...</h3>
            <div className="bannerDeleteBtn" onClick={() => handleDeleteBanner()}>
              <svg className="delete" fill="rgb(179, 3, 3)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M296 64h-80a7.91 7.91 0 00-8 8v24h96V72a7.91 7.91 0 00-8-8z" fill="none" />
                <path d="M432 96h-96V72a40 40 0 00-40-40h-80a40 40 0 00-40 40v24H80a16 16 0 000 32h17l19 304.92c1.42 26.85 22 47.08 48 47.08h184c26.13 0 46.3-19.78 48-47l19-305h17a16 16 0 000-32zM192.57 416H192a16 16 0 01-16-15.43l-8-224a16 16 0 1132-1.14l8 224A16 16 0 01192.57 416zM272 400a16 16 0 01-32 0V176a16 16 0 0132 0zm32-304h-96V72a7.91 7.91 0 018-8h80a7.91 7.91 0 018 8zm32 304.57A16 16 0 01320 416h-.58A16 16 0 01304 399.43l8-224a16 16 0 1132 1.14z" />
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GestionBanner;
