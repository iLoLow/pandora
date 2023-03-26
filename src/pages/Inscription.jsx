import React, { useState } from "react";

function Inscription() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Nom: ${username}, Email: ${email}, Mot de passe: ${password}`);
  };

  return (
    <section className="form">
      <form onSubmit={handleSubmit}>
        <label>
          Nom d'utilisateur :
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <label>
          Mot de passe:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button className="btn" type="submit">S'inscrire</button>
      </form>
    </section>
  );
}

export default Inscription;
