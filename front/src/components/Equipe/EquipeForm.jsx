import Button from "../Others/Button";
import Dropzone from "react-dropzone";

function EquipeForm({ equipe, values, setValues, errors, handleSubmit = () => {} }) {
  return (
    <form className="form" method="POST" onSubmit={handleSubmit}>
      <form-group>
        <label htmlFor="pseudo_discord">Pseudo Discord:</label>
        <input type="text" name="pseudo_discord" id="pseudo_discord" value={values.pseudo_discord} onChange={(e) => setValues({ ...values, pseudo_discord: e.target.value })} />
        {errors.pseudo_discord && <small className="errorSmall">{errors.pseudo_discord}</small>}
      </form-group>
      <form-group>
        <label htmlFor="nom_prenom_rp">Nom Prénom RP:</label>
        <input type="text" name="nom_prenom_rp" id="nom_prenom_rp" value={values.nom_prenom_rp} onChange={(e) => setValues({ ...values, nom_prenom_rp: e.target.value })} />
        {errors.nom_prenom_rp && <small className="errorSmall">{errors.nom_prenom_rp}</small>}
      </form-group>
      <form-group>
        <label htmlFor="fonction">Fonction:</label>
        <input type="text" name="fonction" id="fonction" value={values.fonction} onChange={(e) => setValues({ ...values, fonction: e.target.value })} />
        {errors.fonction && <small className="errorSmall">{errors.fonction}</small>}
      </form-group>
      <form-group>
        <label htmlFor="description">Description:</label>
        <input value={values.description} onChange={(e) => setValues({ ...values, description: e.target.value })} />
        {errors.description && <small className="errorSmall">{errors.description}</small>}
      </form-group>
      <Dropzone multiple={false} onDrop={(acceptedFiles) => setValues({ ...values, avatar_image: acceptedFiles[0] })}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} className="dropzone">
            <div className={errors.avatar_image ? "zone zone-error" : "zone"}>
              <input {...getInputProps()} />
              {errors.avatar_image ? (
                <small className="errorSmall">{errors.avatar_image}</small>
              ) : values.avatar_image ? (
                <p>Image choisie : {values.avatar_image.name}</p>
              ) : equipe && equipe.avatar_url ? (
                <p>Image choisie : {equipe.avatar_url.split("avatars/")[1]}</p>
              ) : (
                <p>Glissez-déposez une image ici, ou cliquez pour sélectionner une image.</p>
              )}
            </div>
          </div>
        )}
      </Dropzone>
      <Button type="submit" children="Valider" />
    </form>
  );
}

export default EquipeForm;
