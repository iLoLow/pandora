import multer from "multer";

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
  "image/webp": "webp",
  "image/png": "png",
  "image/gif": "gif",
};

const storage = multer.diskStorage({
  //gestion de plusieurs destinations de dossiers pour les different dossiers : public/images, public/images/avatars, public/images/annonces, public/images/annonces/thumbs, public/images/boutique, public/images/boutique/thumbs depuis les file fiedname
  destination: (req, file, callback) => {
    if (file.fieldname === "annonce_image") {
      callback(null, "images/annonces");
    } else if (file.fieldname === "avatar_image") {
      callback(null, "images/avatars");
    } else if (file.fieldname === "boutique_image") {
      callback(null, "images/boutique");
    } else {
      callback(null, "images");
    }
  },

  //gestion du nom de fichier
  filename: (req, file, callback) => {
    const name = file.originalname.split(".")[0];
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + "-" + Date.now() + "." + extension);
  },
});

export const multerStorage = multer({ storage: storage });
