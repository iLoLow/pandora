import Abonnement from "../models/Abonnement.mjs";
import sharp from "sharp";
import * as path from "path";
import fs from "fs";

export const createAbonnement = async (req, res) => {
  const { name_abonnement, description, price } = req.body;

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

    await Abonnement.create(name_abonnement, description, price, JSON.stringify(image_url));
    res.status(201).json({ message: "Abonnement créé", code: 201 });
  } catch (error) {
    res.status(500).json({ error: "Impossible de créer l'abonnement", code: 500 });
  }
};

export const getAllAbonnements = async (req, res) => {
  try {
    const abonnements = await Abonnement.getAll();
    res.status(200).json(abonnements);
  } catch (error) {
    res.status(500).json({ error: "Impossible de récupérer les abonnements", code: 500 });
  }
};

export const getAbonnement = async (req, res) => {
  try {
    const abonnement = await Abonnement.getById(req.params.id);
    res.status(200).json(abonnement[0]);
  } catch (error) {
    res.status(500).json({ error: "Impossible de récupérer l'abonnement", code: 500 });
  }
};

export const getLastAbonnements = async (req, res) => {
  try {
    const abonnements = await Abonnement.getLast({ limit: 1 });
    res.status(200).json(abonnements);
  } catch (error) {
    res.status(500).json({ error: "Impossible de récupérer l'abonnement", code: 500 });
  }
};

export const getAbonnementsByUser = async (req, res) => {
  try {
    const abonnements = await Abonnement.getAllByUser(req.params.userId);
    res.status(200).json(abonnements);
  } catch (error) {
    res.status(500).json({ error: "Impossible de récupérer les abonnements", code: 500 });
  }
};

export const updateAbonnement = async (req, res) => {
  try {
    const { name_abonnement, description, price, image_url } = req.body;

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

    await Abonnement.update(req.params.id, name_abonnement, description, price, JSON.stringify(new_image_url));

    if (image_url !== JSON.stringify(new_image_url)) {
      const images = JSON.parse(image_url);

      images.forEach((img) => {
        const oldImageName = img.split("abonnement/")[1];

        fs.unlink(img.substring(1), (err) => {
          if (err) {
            console.log("Imposible de supprimer l'image de l'abonnement", img);
          }
        });
        fs.unlink("images/abonnement/thumbs/" + oldImageName, (err) => {
          if (err) {
            console.log("Impossible de supprimer le thumbnail de l'abonnement : ", img);
          }
        });
      });
    }
    res.status(200).json({ message: "Abonnement modifié", code: 200 });
  } catch (error) {
    res.status(500).json({ error: "Impossible de modifier l'abonnement", code: 500 });
  }
};

export const deleteAbonnement = async (req, res) => {
  try {
    if (!req.params.id) {
      res.status(500).json({ error: "Impossible de supprimer l'abonnement", code: 500 });
    }
    const abonnement = await Abonnement.getById(req.params.id);
    const { image_url } = abonnement[0];

    const images = JSON.parse(image_url);

    images.forEach((img) => {
      const imageName = img.split("abonnement/")[1];

      fs.unlink(img.substring(1), (err) => {
        if (err) {
          console.log("Imposible de supprimer l'image de l'abonnement", imageName);
        }
      });
      fs.unlink("images/abonnement/thumbs/" + imageName, (err) => {
        if (err) {
          console.log("Impossible de supprimer le thumbnail de l'abonnement : ", imageName);
        }
      });
    });

    await Abonnement.delete(req.params.id);

    res.status(200).json({ message: "Abonnement supprimé", code: 200 });
  } catch (error) {
    res.status(500).json({ error: "Impossible de supprimer l'abonnement", code: 500 });
  }
};
