import CarteEquipe from "../components/Others/CarteEquipe";
import "../styles/pages/EquipePandora.css";
import BannerDev from "../assets/SOYEZ_Laurent_Developpeur_WEB.webp";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
document.title = "Equipe Pandora";

function EquipePandora() {
  const [team, setTeam] = useState([]);

  const getTeam = async () => {
    try {
      const response = await fetch("/api/admin/team");
      const data = await response.json();

      if (data) {
        setTeam(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTeam();
  }, []);

  return (
    <>
      <section className="equipePandora">
        <h2 className="equipePandoraTitre">Equipe Pandora RP</h2>

        <div className="equipePandoraContainer">{team.length > 0 && team.map((data, index) => <CarteEquipe key={index} data={data} />)}</div>
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
