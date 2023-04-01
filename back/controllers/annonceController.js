import Annonce from "../models/Annonce.js";

export const createAnnonce = async (req, res) => {
  const { user_id, title, description, image_url } = req.body;

  try {
    await Annonce.create(user_id, title, description, image_url);
    res.status(201).json({ message: "Annonce créée" });
  } catch (error) {
    res.status(500).json({ message: "Impossible de créer l'annonce" });
  }
};

export const getAllAnnonces = async (req, res) => {
  try {
    const annonces = await Annonce.getAll();
    res.status(200).json(annonces);
  } catch (error) {
    res.status(500).json({ message: "Impossible de récupérer les annonces" });
  }
};

export const getLastAnnonces = async (req, res) => {
  try {
    const annonce = await Annonce.getLast({ limit: 1 });
    res.status(200).json(annonce);
  } catch (error) {
    res.status(500).json({ message: "Impossible de récupérer l'annonce" });
  }
};

export const getAnnoncesByUser = async (req, res) => {
  try {
    const annonces = await Annonce.getAllByUser(req.params.userId);
    res.status(200).json(annonces);
  } catch (error) {
    res.status(500).json({ message: "Impossible de récupérer les annonces" });
  }
};

export const updateAnnonce = async (req, res) => {
  console.log(req.body);
  const { title, description, image_url } = req.body;
  try {
    await Annonce.update(req.params.id, title, description, image_url);
    res.status(200).json({ message: "Annonce mise à jour" });
  } catch (error) {
    res.status(500).json({ message: "Impossible de mettre à jour l'annonce" });
  }
};

export const deleteAnnonce = async (req, res) => {
  try {
    await Annonce.delete(req.params.id);
    res.status(200).json({ message: "Annonce supprimée" });
  } catch (error) {
    res.status(500).json({ message: "Impossible de supprimer l'annonce" });
  }
};
