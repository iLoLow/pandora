import Button from "./Button";
import "../styles/FormDiscord.css";

function FormDiscord() {
  return (
    <section className="sectionForm">
      <h2>Webhook Discord</h2>
      <form method="POST" className="formDiscord">
        <form-group>
          <label>URL du Webhook :</label>
          <input type="text" />
        </form-group>
        <form-group>
          <label>URL du Site :</label>
          <input type="text" />
        </form-group>
        <form-group>
          <div className="webhookCheckbox">
            <label>Désactiver le webhook ?</label>
            <input type="checkbox" />
          </div>
        </form-group>
        <div className="webhookBtns">
          <Button type="submit" color="green" children="Enregistrer" />
          <Button color="red" children="Supprimer" />
        </div>
      </form>
    </section>
  );
}

export default FormDiscord;
