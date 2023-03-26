import "../styles/Banner.css";
import imgbanner from "../assets/banner.png";

function Banner() {
  return (
    <section className="banner">
      <img src={imgbanner} alt="" />
    </section>
  );
}

export default Banner;
