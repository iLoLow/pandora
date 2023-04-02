import BarreReseaux from "../components/BarreReseaux";
import "../styles/Rejoindre.css";

function Rejoindre() {
  return (
    <section className="rejoindre">
      <h2 className="rejoindreTitre">Nous Rejoindre</h2>
      <div className="rejoindreTexte">
        <h3>Tu cherches un serveur GTA RP avec une vrai expérience roleplay et du jamais vue sur GTA RP?</h3>
        <p>
          Plongez dans une expérience de jeu immersive et conviviale avec Pandora RP, le serveur RP GTA 5 qui allie sérieux, dynamisme et inventivité. Rejoignez notre communauté en
          obtenant votre place dans notre White List et vivez des aventures uniques dans un environnement de jeu réaliste. Rejoignez-nous dès maintenant pour découvrir un monde de
          possibilités infinies !
        </p>
        <p>Pour faire partie de l'aventure, rejoins-nous sur Discord.</p>
      </div>

      <BarreReseaux />
    </section>
  );
}
export default Rejoindre;
