import User from "../models/User.mjs";
import bcrypt from "bcrypt";

/**
 * Il récupère tous les utilisateurs de la base de données et les renvoie dans un objet JSON
 * @param req - L'objet de requête représente la requête HTTP et possède des propriétés pour la chaîne
 * de requête de la requête, les paramètres, le corps, les en-têtes HTTP, etc.
 * @param res - L'objet de réponse.
 */
export const getAllUsers = (req, res, next) => {
  try {
    User.getAll((err, users) => {
      if (err) {
        return res.status(500).json({ message: "Erreur interne du serveur", code: 500 });
      }

      for (let i = 0; i < users.length; i++) {
        delete users[i].password;
        delete users[i].email;
        delete users[i].id;
      }

      res.status(200).json(users);
    });
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
export const getUserById = (req, res, next) => {
  try {
    User.get(req.params.userId, (err, user) => {
      if (err) {
        return res.status(500).json({ error: "Utilisateur non trouvé", code: 500 });
        next();
      }

      delete user.password;
      delete user.email;
      delete user.id;

      res.status(200).json(user);
    });
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
    const { username, email, oldPassword, password, avatar_url } = req.body;

    // On recupère l'utilisateur grace à son user_id
    const user = await User.get(req.params.userId);

    // Si l'utilisateur n'existe pas
    if (!user) return res.status(400).json({ error: "Email ou mot de passe incorrect", code: 400 });

    // On vérifie que le mot de passe actuel est correct avec celui de la base de données
    const validPassword = await bcrypt.compare(oldPassword, user.password);

    // Si le mot de passe n'est pas correct
    if (!validPassword) {
      return res.status(400).json({ error: "Impossible de mettre à jour votre profil, Mot de passe actuel incorrect.", code: 400 });
    }

    if (password !== undefined) {
      // On hash le nouveau mot de passe si il est différent de undefined
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      await User.update(user.id, username, email, hashedPassword, avatar_url);
    } else {
      await User.update(user.id, username, email, user.password, avatar_url);
    }

    // On met à jour les annonces de l'utilisateur avec son nouveau username et avatar_url
    await User.updateUserInfosOnAnnonces(user.user_id, username, avatar_url);

    return res.status(200).json({ message: "Mise à jour de votre profil réussi.", code: 200 });
  } catch (err) {
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
