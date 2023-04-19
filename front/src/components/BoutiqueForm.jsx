import Dropzone from "react-dropzone";
import Button from "./Button";
import MarkdownEditor from "./MarkdownEditor";

function BoutiqueForm({ boutique, values, setValues, errors, handleSubmit = () => {} }) {
  return (
    <form className="form" method="POST" onSubmit={handleSubmit}>
      <form-group>
        <label htmlFor="name_article">Nom de l'article :</label>
        <input type="text" name="name_article" id="name_article" value={values.name_article} onChange={(e) => setValues({ ...values, name_article: e.target.value })} />
        {errors.name_article && <small className="errorSmall">{errors.name_article}</small>}
      </form-group>

      <form-group>
        <label htmlFor="description">Description :</label>
        <MarkdownEditor editorState={values.description} setEditorState={(content) => setValues({ ...values, description: content })} />
        {errors.description && <small className="errorSmall">{errors.description}</small>}
      </form-group>
      <form-group>
        <label htmlFor="type_vehicule">Type de véhicule :</label>
        <input type="text" name="type_vehicule" id="type_vehicule" value={values.type_vehicule} onChange={(e) => setValues({ ...values, type_vehicule: e.target.value })} />
        {errors.type_vehicule && <small className="errorSmall">{errors.type_vehicule}</small>}
      </form-group>
      <form-group>
        <label htmlFor="price">Prix :</label>
        <input type="number" name="price" id="price" value={values.price} onChange={(e) => setValues({ ...values, price: e.target.value })} />
        {errors.price && <small className="errorSmall">{errors.price}</small>}
      </form-group>
      <Dropzone multiple={false} onDrop={(acceptedFiles) => setValues({ ...values, boutique_image: acceptedFiles[0] })}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} className="dropzone">
            <div className={errors.boutique_image ? "zone zone-error" : "zone"}>
              <input {...getInputProps()} />
              {errors.boutique_image ? (
                <small className="errorSmall">{errors.boutique_image}</small>
              ) : values.boutique_image ? (
                <p>Image choisie : {values.boutique_image.name}</p>
              ) : boutique && boutique.image_url ? (
                <p>Image choisie : {boutique.image_url.split("/boutique/")[1]}</p>
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

export default BoutiqueForm;
