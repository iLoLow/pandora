import Banner from "../models/Banner.mjs";
import fs from "fs";

export const getAllBanner = async (req, res) => {
  try {
    const banner = await Banner.getAll();
    res.status(200).json(banner);
  } catch (err) {
    res.status(500).json({ error: "Impossible de recupérer les banner", code: 500 });
  }
};

export const createBanner = async (req, res) => {
  try {
    const image_url = "/" + req.file.destination + "/" + req.file.filename;
    await Banner.create(image_url);
    res.status(201).json({ message: "Banner créé", code: 201 });
  } catch (err) {
    res.status(500).json({ error: "Impossible de créer le banner", code: 500 });
  }
};
export const updateBanner = async (req, res) => {
  const { image_url } = req.body;
  const new_image_url = req.file ? "/" + req.file.destination + "/" + req.file.filename : image_url;

  try {
    await Banner.update(req.params.id, new_image_url);
    res.status(201).json({ message: "Banner modifié", code: 201 });
  } catch (err) {
    res.status(500).json({ error: "Impossible de modifier le banner", code: 500 });
  }
  if (image_url !== new_image_url) {
    // On supprime l'ancienne image du banner
    fs.unlink(image_url.substring(1), (err) => {
      if (err) {
        console.log("Impossible de supprimer l'image du banner : ", req.file.filename);
      }
    });
  }
};
export const deleteBanner = async (req, res) => {
  try {
    const banner = await Banner.getById(req.params.id);
    const { image_url } = banner[0];
    fs.unlink(image_url.substring(1), (err) => {
      if (err) {
        console.log("Impossible de supprimer l'image du banner : ", imageName);
      }
    });
    await Banner.delete(req.params.id);
    res.status(200).json({ message: "Banner supprimé", code: 200 });
  } catch (err) {
    res.status(500).json({ error: "Impossible de supprimer le banner", code: 500 });
  }
};
