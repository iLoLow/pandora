import Boutique from "../models/Boutique.mjs";
import sharp from "sharp";
import * as path from "path";
import fs from "fs";

//creer un article
export const createBoutiqueItem = async (req, res) => {
  const { name_article, description, price, type_vehicule } = req.body;

  try {
    const files = req.files;
    let image_url = [];

    files.forEach(async (file) => {
      const url = "/" + file.destination + "/" + file.filename;
      image_url.push(url);
      await sharp(file.path, { failOnError: false })
        .resize(600)
        .withMetadata()
        .toFile(path.resolve(file.destination + "/thumbs/" + file.filename));
    });

    await Boutique.create(name_article, description, price, type_vehicule, JSON.stringify(image_url));
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

    let new_image_url = [];

    if (req.files.length > 0) {
      let files = req.files;

      files.forEach(async (file) => {
        const url = "/" + file.destination + "/" + file.filename;
        new_image_url.push(url);
        await sharp(file.path, { failOnError: false })
          .resize(600)
          .withMetadata()
          .toFile(path.resolve(file.destination + "/thumbs/" + file.filename));
      });
    } else {
      new_image_url = JSON.parse(image_url);
    }

    await Boutique.update(req.params.id, name_article, description, price, type_vehicule, JSON.stringify(new_image_url));

    if (image_url !== JSON.stringify(new_image_url)) {
      const images = JSON.parse(image_url);

      images.forEach((img) => {
        const oldImageName = img.split("boutique/")[1];
        fs.unlink(img.substring(1), (err) => {
          if (err) {
            console.log("Impossible de supprimer l'image de l'article : ", img);
          }
        });

        fs.unlink("images/boutique/thumbs/" + oldImageName, (err) => {
          if (err) {
            console.log("Impossible de supprimer le thumbnail de l'article : ", img);
          }
        });
      });
    }

    res.status(200).json({ message: "Article mis à jour", code: 200 });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Impossible de mettre à jour l'article", code: 500 });
  }
};

/**
 * Supression d'un article
 *
 */
export const deleteBoutiqueItem = async (req, res) => {
  try {
    if (!req.params.id) {
      res.status(500).json({ error: "Impossible de supprimer l'article", code: 500 });
    }
    const boutique = await Boutique.getOne(req.params.id);
    const { image_url } = boutique[0];

    const images = JSON.parse(image_url);

    images.forEach((img) => {
      const imageName = img.split("boutique/")[1];

      fs.unlink(img.substring(1), (err) => {
        if (err) {
          console.log("Impossible de supprimer l'image de l'article : ", imageName);
        }
      });
      fs.unlink("images/boutique/thumbs/" + imageName, (err) => {
        if (err) {
          console.log("Impossible de supprimer l'image de l'article : ", imageName);
        }
      });
    });

    await Boutique.delete(req.params.id);

    res.status(200).json({ message: "Article supprimé", code: 200 });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Impossible de supprimer l'article", code: 500 });
  }
};
