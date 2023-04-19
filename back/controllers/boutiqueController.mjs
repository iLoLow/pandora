import Boutique from "../models/Boutique.mjs";
import sharp from "sharp";
import * as path from "path";
import fs from "fs";

//creer un article
export const createBoutiqueItem = async (req, res) => {
  const { name_article, description, price, type_vehicule } = req.body;

  try {
    const image_url = "/" + req.file.destination + "/" + req.file.filename;

    const { filename: image } = req.file;
    await sharp(req.file.path, { failOnError: false })
      .resize(200)
      .withMetadata()
      .toFile(path.resolve(req.file.destination + "/thumbs/" + image));

    await Boutique.create(name_article, description, price, type_vehicule, image_url);
    res.status(201).json({ message: "Article créé", code: 201 });
  } catch (error) {
    res.status(500).json({ error: "Impossible de créer l'article", code: 500 });
  }
};

//recuperer tous les articles
export const getAllBoutiqueItems = async (req, res) => {
  try {
    const boutique = await Boutique.getAll();
    res.status(200).json(boutique);
  } catch (error) {
    res.status(500).json({ error: "Impossible de récupérer les articles", code: 500 });
  }
};

//recuperer un article
export const getBoutiqueItem = async (req, res) => {
  try {
    const boutique = await Boutique.getOne(req.params.id);
    res.status(200).json(boutique[0]);
  } catch (error) {
    res.status(500).json({ error: "Impossible de récupérer l'article", code: 500 });
  }
};

//mettre a jour un article
export const updateBoutiqueItem = async (req, res) => {
  try {
    const { name_article, description, price, type_vehicule, image_url } = req.body;

    const new_image_url = req.file ? "/" + req.file.destination + "/" + req.file.filename : image_url;

    // si nouvelle image on crée sa thumbnail
    if (req.file) {
      await sharp(req.file.path, { failOnError: false })
        .resize(200)
        .withMetadata()
        .toFile(path.resolve(req.file.destination + "/thumbs/" + req.file.filename));
    }

    await Boutique.update(req.params.id, name_article, description, price, type_vehicule, new_image_url);

    if (image_url !== new_image_url) {
      const oldImageName = image_url.split("boutique/")[1];
      fs.unlink(image_url.substring(1), (err) => {
        if (err) {
          console.log("Impossible de supprimer l'image de l'article : ", req.file.filename);
        }
      });

      fs.unlink("images/boutique/thumbs/" + oldImageName, (err) => {
        if (err) {
          console.log("Impossible de supprimer le thumbnail de l'article : ", req.file.filename);
        }
      });
    }

    res.status(200).json({ message: "Article mis à jour", code: 200 });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Impossible de mettre à jour l'article", code: 500 });
  }
};
//supprimer un article
export const deleteBoutiqueItem = async (req, res) => {
  try {
    if (!req.params.id) {
      res.status(500).json({ error: "Impossible de supprimer l'article", code: 500 });
    }
    const boutique = await Boutique.getOne(req.params.id);
    const { image_url } = boutique[0];
    const imageName = image_url.split("boutique/")[1];

    fs.unlink(image_url.substring(1), (err) => {
      if (err) {
        console.log("Impossible de supprimer l'image de l'article : ", imageName);
      }
    });
    fs.unlink("images/boutique/thumbs/" + imageName, (err) => {
      if (err) {
        console.log("Impossible de supprimer l'image de l'article : ", imageName);
      }
    });

    await Boutique.delete(req.params.id);

    res.status(200).json({ message: "Article supprimé", code: 200 });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Impossible de supprimer l'article", code: 500 });
  }
};
