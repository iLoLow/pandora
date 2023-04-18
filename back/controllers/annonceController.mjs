import Annonce from "../models/Annonce.mjs";
import sharp from "sharp";
import * as path from "path";
import fs from "fs";

export const createAnnonce = async (req, res) => {
  const { title, description, user_id, username, avatar_url } = req.body;

  try {
    const image_url = "/" + req.file.destination + "/" + req.file.filename;

    const { filename: image } = req.file;
    await sharp(req.file.path, { failOnError: false })
      .resize(200)
      .withMetadata()
      .toFile(path.resolve(req.file.destination + "/thumbs/" + image));

    await Annonce.create(title, description, image_url, user_id, username, avatar_url);
    res.status(201).json({ message: "Annonce créée", code: 201 });
  } catch (error) {
    res.status(500).json({ error: "Impossible de créer l'annonce", code: 500 });
  }
};

export const getAllAnnonces = async (req, res) => {
  try {
    const annonces = await Annonce.getAll();
    res.status(200).json(annonces);
  } catch (error) {
    res.status(500).json({ error: "Impossible de récupérer les annonces", code: 500 });
  }
};

export const getAnnonce = async (req, res) => {
  try {
    const annonce = await Annonce.getById(req.params.id);
    res.status(200).json(annonce[0]);
  } catch (error) {
    res.status(500).json({ error: "Impossible de récupérer l'annonce", code: 500 });
  }
};

export const getLastAnnonces = async (req, res) => {
  try {
    const annonces = await Annonce.getLast({ limit: 1 });
    res.status(200).json(annonces);
  } catch (error) {
    res.status(500).json({ error: "Impossible de récupérer l'annonce", code: 500 });
  }
};

export const getAnnoncesByUser = async (req, res) => {
  try {
    const annonces = await Annonce.getAllByUser(req.params.userId);
    res.status(200).json(annonces);
  } catch (error) {
    res.status(500).json({ error: "Impossible de récupérer les annonces", code: 500 });
  }
};

export const updateAnnonce = async (req, res) => {
  try {
    const { title, description, image_url } = req.body;

    const new_image_url = req.file ? "/" + req.file.destination + "/" + req.file.filename : image_url;

    // si nouvelle image on crée sa thumbnail
    if (req.file) {
      await sharp(req.file.path, { failOnError: false })
        .resize(200)
        .withMetadata()
        .toFile(path.resolve(req.file.destination + "/thumbs/" + req.file.filename));
    }

    await Annonce.update(req.params.id, title, description, new_image_url);

    //si l'image de l'annonce est modifiée on supprime l'ancienne image et son thumbs puis on enregistre la nouvelle image on redimensionne l'image et on enregistre le thumbs.
    if (image_url !== new_image_url) {
      const oldImageName = image_url.split("annonces/")[1];
      // On supprime l'ancienne image de profil
      fs.unlink(image_url.substring(1), (err) => {
        if (err) {
          console.log("Impossible de supprimer l'image de l'annonce : ", req.file.filename);
        }
      });
      fs.unlink("images/annonces/thumbs/" + oldImageName, (err) => {
        if (err) {
          console.log("Impossible de supprimer l'image de l'annonce : ", req.file.filename);
        }
      });
    }

    res.status(200).json({ message: "Annonce mise à jour", code: 200 });
  } catch (error) {
    res.status(500).json({ error: "Impossible de mettre à jour l'annonce", code: 500 });
  }
};

export const deleteAnnonce = async (req, res) => {
  try {
    if (!req.params.id) {
      res.status(500).json({ error: "Impossible de supprimer l'annonce", code: 500 });
    }
    const annonce = await Annonce.getById(req.params.id);
    const { image_url } = annonce[0];
    const imageName = image_url.split("annonces/")[1];

    fs.unlink(image_url.substring(1), (err) => {
      if (err) {
        console.log("Impossible de supprimer l'image de l'annonce : ", imageName);
      }
    });
    fs.unlink("images/annonces/thumbs/" + imageName, (err) => {
      if (err) {
        console.log("Impossible de supprimer l'image de l'annonce : ", imageName);
      }
    });
    await Annonce.delete(req.params.id);
    res.status(200).json({ message: "Annonce supprimée", code: 200 });
  } catch (error) {
    res.status(500).json({ error: "Impossible de supprimer l'annonce", code: 500 });
  }
};

export const likeOrDislikeAnnonce = async (req, res) => {
  try {
    const { visitorId, isLiked, isDisliked } = req.body;
    await Annonce.likeOrDislike(req.params.id, visitorId, isLiked, isDisliked);
    res.status(200).json({ message: "Annonce likée", code: 200 });
  } catch (error) {
    res.status(500).json({ error: "Impossible de liker l'annonce", code: 500 });
  }
};
