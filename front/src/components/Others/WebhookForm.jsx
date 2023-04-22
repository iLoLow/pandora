import Button from "./Button";

function WebhookForm({ values, setValues, errors, handleAddWebhookSubmit = () => {} }) {
  return (
    <section className="webhookForm">
      <form method="POST" className="formDiscord" onSubmit={handleAddWebhookSubmit}>
        <form-group>
          <label>URL du Webhook :</label>
          <input type="text" />
        </form-group>

        <form-group>
          <div className="webhookCheckbox">
            <label>Activer le webhook ?</label>
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

export default WebhookForm;
