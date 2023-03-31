import BarreReseaux from "../components/BarreReseaux";
import "../styles/Rejoindre.css";

function Rejoindre() {
  return (
    <section className="rejoindre">
      <h2 className="rejoindreTitre">Nous Rejoindre</h2>
      <div className="rejoindreTexte">
        <p>Tu cherches un serveur GTA RP avec une vrai expérience roleplay et du jamais vue sur GTA RP?</p>
        <p>
          Si tu estimes que ton RP est sérieux, dynamique ou inventif, n'hésite plus et rejoins nous sur Pandora RP! ( WL ) 🌴 Le staff est réactif et posé, avec un mapping et un
          système RP unique.
        </p>
        <p>Rejoints vite le serveur Discord pour demander ton accès !</p>
        <p>Nous espérons t'avoir convaincue de nous rejoindre et t'attendons que tu rejoignes le projet pour jouer ensemble !</p>
      </div>

      <BarreReseaux />
    </section>
  );
}
export default Rejoindre;
