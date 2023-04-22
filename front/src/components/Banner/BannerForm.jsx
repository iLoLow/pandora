import Dropzone from "react-dropzone";
import Button from "../Others/Button";

//formulaire pour changer l'image de la banniere de la page d'accueil
function BannerForm({ banner, values, setValues, errors, handleSubmit = () => {} }) {
  return (
    <form className="form" method="POST" onSubmit={handleSubmit}>
      <Dropzone multiple={false} onDrop={(acceptedFiles) => setValues({ ...values, banner_image: acceptedFiles[0] })}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} className="dropzone">
            <div className={errors.banner_image ? "zone zone-error" : "zone"}>
              <input {...getInputProps()} />
              {errors.banner_image ? (
                <small className="errorSmall">{errors.banner_image}</small>
              ) : values.banner_image ? (
                <p>Image choisie : {values.banner_image.name}</p>
              ) : banner && banner.image_url ? (
                <p>Image choisie : {banner.image_url.split("banner/")[1]}</p>
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

export default BannerForm;
