import { Link } from "react-router-dom";
import "../../styles/layout/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <h2>Pandora RP.</h2>
      <p>
        <span>
          Design et développement :
          <Link to={"https://soyezlaurentdev.com"}>
            <span>SOYEZ Laurent</span>
          </Link>
        </span>
        <span>© Tous droits réservés. 2023</span>
      </p>
      <h2>Liens utiles</h2>
      <span className="flexLink">
        <Link className="lien" to={"/cgu"}>
          CGU
        </Link>
        <Link className="lien" to={"/rgpd"}>
          RGPD
        </Link>
      </span>
    </footer>
  );
}

export default Footer;
