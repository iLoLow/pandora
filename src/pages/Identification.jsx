import "../styles/Identification.css";
import { useState } from "react";
import { Link } from "react-router-dom";

function Identification() {
  document.title = "Pandora RP";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Submitting: ${username} - ${password}`);
  };
  return (
    <section className="form">
      <button className="btn">
        <Link to="/inscription" aria-label="Accueil">
          S'inscrire
        </Link>
      </button>
      <form onSubmit={handleSubmit}>
        <label>
          Nom d'utilisateur:
          <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
        </label>
        <br />
        <label>
          Mot de passe:
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </label>
        <br />
        <button className="btn" type="submit">
          Login
        </button>
      </form>
    </section>
  );
}
export default Identification;
