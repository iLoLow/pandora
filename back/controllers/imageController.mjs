import fs from "fs/promises";
import * as path from "path";

export const getAllImages = async (req, res, next) => {
  try {
    const imagesByDirectories = {};
    const imagesDirs = {
      avatars: "images/avatars",
      annonces: "images/annonces/thumbs",
      boutique: "images/boutique/thumbs",
    };

    for (const dir in imagesDirs) {
      const files = await fs.readdir(imagesDirs[dir]);

      let arrayFiles = [];

      for (const file of files) {
        const fileObject = {
          name: file,
          url: "/" + imagesDirs[dir] + "/" + file,
        };
        arrayFiles.push(fileObject);
      }

      imagesByDirectories[dir] = arrayFiles;
    }

    res.status(200).json(imagesByDirectories);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Erreur interne du serveur.", code: 500 });
    next();
  }
};

export const deleteImage = async (req, res, next) => {
  const { name } = req.params;
  const filePathThumb = path.join("public/assets/thumbs", name);
  const filePathImage = path.join("public/assets", name);
  try {
    fs.unlinkSync(filePathThumb);
    fs.unlinkSync(filePathImage);
    res.json({ message: "Image supprimée avec succès.", code: 200 });
  } catch (err) {
    res.status(500).json({ error: "Error deleting files" });
  }
};
