// import "../Styles/Home.css";
import { Link } from "react-router-dom";
import Banner from "../components/Banner";

function Home() {
  document.title = "Pandora RP";

  return (
    <>
      <section className="home">
        <Banner />
        <h1 className="title-home">Pandora RP - Serveur GTA RP</h1>
        <p>Bienvenue sur notre site de roleplay GTA 5.</p>
        <p>Pandora RP est un serveur WhiteList</p>
        <button>
          <Link to="">Rejoins-nous</Link>
        </button>
      </section>
    </>
  );
}
export default Home;
