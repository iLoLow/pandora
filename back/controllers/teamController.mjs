import Team from "../models/Team.mjs";
import fs from "fs";

export const createMemberTeam = async (req, res) => {
  try {
    const { pseudo_discord, nom_prenom_rp, fonction, description } = req.body;
    const avatar_url = "/" + req.file.destination + "/" + req.file.filename;

    await Team.create(pseudo_discord, nom_prenom_rp, fonction, description, avatar_url);
    res.status(201).json({ message: "Membre créé", code: 201 });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Impossible de créer le Membre", code: 500 });
  }
};

export const getTeamByOrder = async (req, res) => {
  try {
    const team = await Team.getAllByOrder();

    res.status(200).json(team);
  } catch (error) {
    res.status(500).json({ error: "Impossible de récupérer les infos de l'équipe", code: 500 });
  }
};

export const updateMemberTeam = async (req, res) => {
  try {
    const { pseudo_discord, nom_prenom_rp, fonction, description, avatar_url } = req.body;
    const new_avatar_url = req.file ? "/" + req.file.destination + "/" + req.file.filename : avatar_url;

    await Team.update(req.params.id, pseudo_discord, nom_prenom_rp, fonction, description, new_avatar_url);

    if (avatar_url !== new_avatar_url) {
      // On supprime l'ancienne image de l'annonce
      fs.unlink(avatar_url.substring(1), (err) => {
        if (err) {
          console.log("Impossible de supprimer l'image du membre: ", req.file.filename);
        }
      });
    }

    res.status(200).json({ message: "Membre mis à jour.", code: 200 });
  } catch (error) {
    res.status(500).json({ error: "Impossible de mettre à jour le membre.", code: 500 });
  }
};

export const updateOrderMemberTeam = async (req, res) => {
  try {
    const { order_id } = req.body;
    await Team.updateOrderById(req.params.id, order_id);
    res.status(200).json({ message: "Order Id mis à jour avec succés.", code: 200 });
  } catch (error) {
    res.status(500).json({ error: "Impossible de mettre à jour l'order Id.", code: 500 });
  }
};

export const deleteMemberTeam = async (req, res) => {
  try {
    if (!req.params.id) {
      res.status(500).json({ error: "Impossible de suprimer le membre.", code: 500 });
    }
    const member = await Team.getById(req.params.id);
    const { avatar_url } = member[0];
    const imageName = avatar_url.split("avatars/")[1];

    fs.unlink(avatar_url.substring(1), (err) => {
      if (err) {
        console.log("Impossible de supprimer l'image de l'annonce : ", imageName);
      }
    });

    await Team.delete(req.params.id);
    res.status(200).json({ message: "Membre supprimé.", code: 200 });
  } catch (error) {
    res.status(500).json({ error: "Impossible de suprimer le membre.", code: 500 });
  }
};
