import "../Styles/Identification.css";
import { useState } from "react";

function Identification() {
  document.title = "Pandora RP";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Submitting: ${username} - ${password}`);
  };
  return (
    <section className="formIdentification">
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
        <button type="submit">Login</button>
      </form>
    </section>
  );
}
export default Identification;
