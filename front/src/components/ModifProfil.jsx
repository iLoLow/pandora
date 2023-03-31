import "../styles/ModifProfil.css";

function ModifProfil() {
  const recupUser = async () => {
    await fetch("/api/user", {
      method: "GET",
      body: c,
    });
  };
  return <></>;
}

export default ModifProfil;
