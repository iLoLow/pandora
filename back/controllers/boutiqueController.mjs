import Boutique from "../models/Boutique.mjs";
import sharp from "sharp";
import * as path from "path";
//creer un article
export const createBoutiqueItem = async (req, res) => {
  const { name_article, description, price, type_vehicule, image_url } = req.body;
  try {
    const { filename: image } = req.file;
    await sharp(req.file.path, { failOnError: false })
      .resize(200)
      .withMetadata()
      .toFile(path.resolve(req.file.destination + "/thumbs/" + image));

    await Boutique.create(name_article, description, price, type_vehicule, image_url);
    res.status(200).json({ message: "Article créé", code: 200 });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Impossible de créer l'article", code: 500 });
  }
};

//recuperer tous les articles
export const getAllBoutiqueItems = async (req, res) => {
  try {
    const items = await Boutique.getAll();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: "Impossible de récupérer les articles", code: 500 });
  }
};

//recuperer un article
export const getBoutiqueItem = async (req, res) => {
  try {
    const item = await Boutique.getById(req.params.id);
    res.status(200).json(item[0]);
  } catch (error) {
    res.status(500).json({ error: "Impossible de récupérer l'article", code: 500 });
  }
};
//mettre a jour un article
export const updateBoutiqueItem = async (req, res) => {
  const { name_article, description, price, type_vehicule, image_url } = req.body;
  try {
    await Boutique.update(req.params.id, name_article, description, price, type_vehicule, image_url);
    res.status(200).json({ message: "Article mis à jour", code: 200 });
  } catch (error) {
    res.status(500).json({ error: "Impossible de mettre à jour l'article", code: 500 });
  }
};
//supprimer un article
export const deleteBoutiqueItem = async (req, res) => {
  try {
    await Boutique.delete(req.params.id);
    res.status(200).json({ message: "Article supprimé", code: 200 });
  } catch (error) {
    res.status(500).json({ error: "Impossible de supprimer l'article", code: 500 });
  }
};
