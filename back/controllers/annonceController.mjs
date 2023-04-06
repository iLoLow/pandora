import Annonce from "../models/Annonce.mjs";

export const createAnnonce = async (req, res) => {
  const { title, description, user_id, image_url, username, avatar_url } = req.body;

  try {
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

export const getLastAnnonces = async (req, res) => {
  try {
    const annonce = await Annonce.getLast({ limit: 1 });
    res.status(200).json(annonce);
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
  const { title, description, image_url } = req.body;
  try {
    await Annonce.update(req.params.id, title, description, image_url);
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
    await Annonce.delete(req.params.id);
    res.status(200).json({ message: "Annonce supprimée", code: 200 });
  } catch (error) {
    res.status(500).json({ error: "Impossible de supprimer l'annonce", code: 500 });
  }
};
