import Button from "../components/Button";
import Dropzone from "react-dropzone";
import MarkdownEditor from "../components/MarkdownEditor";

function AnnonceForm({ annonce, values, setValues, errors, handleSubmit = () => {} }) {
  return (
    <form className="form" method="POST" onSubmit={handleSubmit}>
      <form-group>
        <label htmlFor="title">Titre :</label>
        <input type="text" name="title" id="title" value={values.title} onChange={(e) => setValues({ ...values, title: e.target.value })} />
        {errors.title && <small className="errorSmall">{errors.title}</small>}
      </form-group>
      <form-group>
        <label htmlFor="description">Description :</label>
        <MarkdownEditor editorState={values.description} setEditorState={(content) => setValues({ ...values, description: content })} />
        {errors.description && <small className="errorSmall">{errors.description}</small>}
      </form-group>
      <Dropzone multiple={false} onDrop={(acceptedFiles) => setValues({ ...values, annonce_image: acceptedFiles[0] })}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} className="dropzone">
            <div className={errors.annonce_image ? "zone zone-error" : "zone"}>
              <input {...getInputProps()} />
              {errors.annonce_image ? (
                <small className="errorSmall">{errors.annonce_image}</small>
              ) : values.annonce_image ? (
                <p>Image choisie : {values.annonce_image.name}</p>
              ) : annonce && annonce.image_url ? (
                <p>Image choisie : {annonce.image_url.split("annonces/")[1]}</p>
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

export default AnnonceForm;
