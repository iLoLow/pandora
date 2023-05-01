import React, { useState, useEffect } from "react";
import myIcon from "../../assets/arrow-up-outline.svg";
import "../../styles/others/ScrollToTop.css";

function ScrollToTop() {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return <div className="top-to-btm">{showTopBtn && <img src={myIcon} alt="Scroll to top" className="icon-position icon-style" onClick={goToTop} />}</div>;
}

export default ScrollToTop;
