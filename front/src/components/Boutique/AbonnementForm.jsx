import Dropzone from "react-dropzone";
import Button from "../Others/Button";
import MarkdownEditor from "../Others/MarkdownEditor";

//formulaire de creation d'un abonnement VIP a acheter dans la boutique
function AbonnementForm({ abonnement, values, setValues, errors, handleSubmit = () => {} }) {
  return (
    <form className="form" method="POST" onSubmit={handleSubmit}>
      <form-group>
        <label htmlFor="name_abonnement">Nom de l'abonnement :</label>
        <input type="text" name="name_abonnement" id="name_abonnement" value={values.name_abonnement} onChange={(e) => setValues({ ...values, name_abonnement: e.target.value })} />
        {errors.name_abonnement && <small className="errorSmall">{errors.name_abonnement}</small>}
      </form-group>

      <form-group>
        <label htmlFor="description">Description :</label>
        <MarkdownEditor editorState={values.description} setEditorState={(content) => setValues({ ...values, description: content })} />
        {errors.description && <small className="errorSmall">{errors.description}</small>}
      </form-group>
      <form-group>
        <label htmlFor="price">Prix :</label>
        <input type="number" name="price" id="price" value={values.price} onChange={(e) => setValues({ ...values, price: e.target.value })} />
        {errors.price && <small className="errorSmall">{errors.price}</small>}
      </form-group>
      <Dropzone multiple={true} onDrop={(acceptedFiles) => setValues({ ...values, abonnement_image: values.abonnement_image.concat(...acceptedFiles) })}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} className="dropzone">
            <div className={errors.abonnement_image ? "zone zone-error" : "zone"}>
              <input {...getInputProps()} />
              {errors.abonnement_image ? (
                <small className="errorSmall">{errors.abonnement_image}</small>
              ) : values.abonnement_image.length > 0 ? (
                <div>
                  <p>Image(s) : </p>
                  {values.abonnement_image.map((img, k) => (
                    <p key={k}>{img.name}</p>
                  ))}
                </div>
              ) : abonnement && abonnement.image_url ? (
                <div>
                  <p>Image(s) : </p>
                  {JSON.parse(abonnement.image_url).map((img, k) => (
                    <p key={k}>{img.split("/abonnement/")[1]}</p>
                  ))}
                </div>
              ) : (
                <p>Glissez et déposez des images ici, ou cliquez pour sélectionner des images.</p>
              )}
            </div>
          </div>
        )}
      </Dropzone>
      <Button type="submit" children="Valider" />
    </form>
  );
}

export default AbonnementForm;
