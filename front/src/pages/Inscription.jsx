import { useState } from "react";

function Inscription() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const createUser = async (user) => {
    await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { username, email, password };
    console.log(user)
    createUser(user);
  };

  return (
    <section className="form" >
      <h2 className="titleForm">S'inscrire</h2>
      <form method="post" onSubmit={(e) => handleSubmit(e)}>
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
        <button className="btn" type="submit" >
          S'inscrire
        </button>
      </form>
    </section>
  );
}

export default Inscription;
