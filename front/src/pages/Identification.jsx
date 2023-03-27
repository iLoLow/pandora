import "../styles/Identification.css";
import { useState } from "react";
import { Link } from "react-router-dom";

function Identification() {
  document.title = "Pandora RP";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (user) => {
    await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = { email, password };
    login(user);
  };

  return (
    <section className="form">
      <h2 className="titleForm">S'identifier</h2>
      <button className="btn">
        <Link to="/inscription" aria-label="Accueil">
          S'inscrire
        </Link>
      </button>
      <form method="POST" onSubmit={(e) => handleSubmit(e)}>
        <label>
          Email de l'utilisateur:
          <input type="text" value={email} onChange={(event) => setEmail(event.target.value)} />
        </label>
        <br />
        <label>
          Mot de passe:
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </label>
        <br />
        <button className="btn" type="submit">
          Se connecter
        </button>
      </form>
    </section>
  );
}
export default Identification;
