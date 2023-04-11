import CarteEquipe from "../components/CarteEquipe";
import "../styles/EquipePandora.css";
import datas from "../assets/equipePandora.json";
import BannerDev from "../assets/SOYEZ_Laurent_Developpeur_WEB.webp";
import { Link } from "react-router-dom";

function EquipePandora() {
  return (
    <>
      <section className="equipePandora">
        <h2 className="equipePandoraTitre">Equipe Pandora RP</h2>

        <div className="equipePandoraContainer">
          {datas.map((data, index) => (
            <CarteEquipe key={index} data={data} />
          ))}
        </div>
      </section>
      <section className="partenaire">
        <h2 className="partenaireTitre">Partenaire</h2>
        <div className="partenaineContainer">
          <Link to={"https://soyezlaurentdev.com"} target="__blank">
            <div className="banniereDev">
              <img src={BannerDev} alt="banner dev" />
            </div>
          </Link>
        </div>
      </section>
    </>
  );
}

export default EquipePandora;
