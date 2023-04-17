import Dropzone from "react-dropzone";
import Button from "./Button";
import MarkdownEditor from "./MarkdownEditor";

function FormBoutique({ values, setValues, errors, handleSubmit = () => {} }) {
  return (
    <form className="formBoutique" method="POST" onSubmit={handleSubmit}>
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
        <label htmlFor="type_de_vehicule">Type de véhicule :</label>
        <input
          type="text"
          name="type_de_vehicule"
          id="type_de_vehicule"
          value={values.type_de_vehicule}
          onChange={(e) => setValues({ ...values, type_de_vehicule: e.target.value })}
        />
        {errors.type_de_vehicule && <small className="errorSmall">{errors.type_de_vehicule}</small>}
      </form-group>
      <form-group>
        <label htmlFor="price">Prix :</label>
        <input type="number" name="price" id="price" value={values.price} onChange={(e) => setValues({ ...values, price: e.target.value })} />
        {errors.price && <small className="errorSmall">{errors.price}</small>}
      </form-group>
      <Dropzone multiple={false} onDrop={(acceptedFiles) => setValues({ ...values, image: acceptedFiles[0], image_url: "/assets/" + acceptedFiles[0].name })}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} className="dropzone">
            <div className={errors.image ? "zone zone-error" : "zone"}>
              <input {...getInputProps()} />
              {errors.image ? (
                <small className="errorSmall">{errors.image}</small>
              ) : values.image ? (
                <p>Image choisie : {values.image.name}</p>
              ) : values.image_url ? (
                <p>Image choisie : {values.image_url.split("/assets/")[1]}</p>
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

export default FormBoutique;