import User from "../models/User.mjs";
import bcrypt from "bcrypt";
import fs from "fs";

/**
 * Récuperation de tous les utilisateurs
 */
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.getAll();

    for (let i = 0; i < users.length; i++) {
      delete users[i].id;
    }

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: "Erreur interne du serveur", code: 500 });
    next();
  }
};

/**
 * Il obtient un utilisateur par son identifiant
 * @param req - L'objet de la requête. Cet objet représente la requête HTTP et possède des propriétés
 * pour la chaîne de requête de requête, les paramètres, le corps, les en-têtes HTTP, etc.
 * @param res - l'objet de réponse
 */
export const getUserById = async (req, res, next) => {
  try {
    const user = await User.get(req.params.userId);

    delete user.password;
    delete user.id;

    res.status(200).json(user[0]);
  } catch (err) {
    res.status(500).json({ error: "Erreur interne du serveur", code: 500 });
    next();
  }
};

/**
 * Il met à jour un utilisateur dans la base de données
 * @param req - l'objet de la requête
 * @param res - l'objet de réponse
 */
export const updateUser = async (req, res, next) => {
  try {
    const { username, email, password, is_admin } = req.body;

    // On recupère l'utilisateur grace à son user_id
    const userArray = await User.get(req.params.userId);

    // on récupère le premier user trouvé dans le tableau
    const user = userArray[0];

    // Si l'utilisateur n'existe pas
    if (!user) return res.status(400).json({ error: "Email ou mot de passe incorrect", code: 400 });

    const avatar_url = req.file ? "/" + req.file.destination + "/" + req.file.filename : user.avatar_url;

    if (password !== undefined) {
      // On hash le nouveau mot de passe si il est différent de undefined
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      await User.update(user.id, username, email, hashedPassword, avatar_url, is_admin);
    } else {
      await User.update(user.id, username, email, user.password, avatar_url, is_admin);
    }

    //si  l'utilisateur a changé son image de profil on supprime l'ancienne image de profil
    if (user.avatar_url !== avatar_url) {
      // On supprime l'ancienne image de profil
      fs.unlink(user.avatar_url.substring(1), (err) => {
        if (err) {
          console.log("Impossible de supprimer l'avatar : ", user.avatar_url);
        }
      });
    }

    // On met à jour les annonces de l'utilisateur avec son nouveau username et avatar_url

    await User.updateUserInfosOnAnnonces(user.user_id, username, avatar_url);

    return res.status(200).json({ message: "Mise à jour de votre profil réussi.", code: 200 });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Erreur interne du serveur", code: 500 });
    next();
  }
};

/**
 * Il supprime un utilisateur de la base de données
 * @param req - L'objet de la requête.
 * @param res - l'objet de réponse
 */
export const deleteUser = (req, res, next) => {
  try {
    User.delete(req.params.userId, (err) => {
      if (err) {
        return res.status(500).json({ error: "Impossible de supprimer votre compte.", code: 500 });
      }
      res.status(200).json({ message: "Votre compte a été supprimer avec succès.", code: 200 });
    });
  } catch (error) {
    res.status(500).json({ error: "Erreur interne du serveur", code: 500 });
    next();
  }
};
