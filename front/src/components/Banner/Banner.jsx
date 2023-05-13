import "../../styles/Banner/Banner.css";
import React, { useState, useEffect } from "react";

function Banner() {
  const [banner, setBanner] = useState([]);

  const getBanner = async () => {
    try {
      const response = await fetch("/api/banner");
      const data = await response.json();
      setBanner(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBanner();
  }, []);

  return <div className="banner">{banner.length > 0 && <img src={banner[0].image_url} alt="banniere pandora rp" />}</div>;
}

export default Banner;
