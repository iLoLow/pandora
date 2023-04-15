import fs from "fs";
import * as path from "path";

export const getAllImages = async (req, res, next) => {
  try {
    fs.readdir(path.join("public/assets/thumbs"), (err, files) => {
      if (err) {
        res.status(500).json({ error: "Error reading files", code: 500 });
      } else {
        const images = files.map((file) => {
          return {
            name: file,
            type: file.split(".")[1],
            url: `/assets/thumbs/${file}`,
          };
        });
        res.json(images);
      }
    });
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
