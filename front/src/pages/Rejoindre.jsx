import BarreReseaux from "../components/BarreReseaux";
import "../styles/Rejoindre.css";
import logo from "../assets/logoPandora.png";

function Rejoindre() {
  return (
    <>
      <section className="rejoindre">
        <div className="rejoindreContainer">
          <div className="rejoindreTitre">
            <h2>Tu cherches un serveur GTA RP ... </h2>
            <h3>Avec une vraie expérience roleplay et du jamais vue sur GTA RP?</h3>
          </div>
          <div className="rejoindreImage">
            <img src={logo} alt="rejoindre" />
          </div>
          <div className="rejoindreTexte">
            <p>
              Plongez dans une expérience de jeu immersive et conviviale avec Pandora RP, le serveur RP GTA 5 qui allie sérieux, dynamisme et inventivité. Rejoignez notre
              communauté en obtenant votre place dans notre White List et vivez des aventures uniques dans un environnement de jeu réaliste. <br /> Rejoignez-nous dès maintenant
              pour découvrir un monde de possibilités infinies !
            </p>
            <p>Pour faire partie de l'aventure, rejoins-nous sur Discord.</p>
          </div>
        </div>
        <BarreReseaux />
      </section>
    </>
  );
}
export default Rejoindre;
