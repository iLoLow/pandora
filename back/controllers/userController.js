import User from "../models/User.js";

/**
 * Il récupère tous les utilisateurs de la base de données et les renvoie dans un objet JSON
 * @param req - L'objet de requête représente la requête HTTP et possède des propriétés pour la chaîne
 * de requête de la requête, les paramètres, le corps, les en-têtes HTTP, etc.
 * @param res - L'objet de réponse.
 */
export const getAllUsers = (req, res) => {
  User.getAll((err, users) => {
    if (err) {
      return res.status(500).json({ message: "Erreur interne du serveur" });
      next();
    }

    for (let i = 0; i < users.length; i++) {
      delete users[i].password;
      delete users[i].email;
      delete users[i].id;
    }

    res.status(200).json(users);
  });
};

/**
 * Il obtient un utilisateur par son identifiant
 * @param req - L'objet de la requête. Cet objet représente la requête HTTP et possède des propriétés
 * pour la chaîne de requête de requête, les paramètres, le corps, les en-têtes HTTP, etc.
 * @param res - l'objet de réponse
 */
export const getUserById = (req, res) => {
  User.get(req.params.userId, (err, user) => {
    if (err) {
      return res.status(500).json({ message: "Utilisateur non trouvé" });
      next();
    }

    delete user.password;
    delete user.email;
    delete user.id;

    res.status(200).json(user);
  });
};

/**
 * Il met à jour un utilisateur dans la base de données
 * @param req - l'objet de la requête
 * @param res - l'objet de réponse
 */
export const updateUser = (req, res) => {
  const { username, email, password, avatar_url } = req.body;
  User.update(req.params.userId, username, email, password, avatar_url, (err) => {
    if (err) {
      return res.status(500).json({ message: "Impossible de mettre à jour l'utilsateur" });
      next();
    }
    res.status(200).json({ message: "Utilisateur mis à jour" });
  });
};

/**
 * Il supprime un utilisateur de la base de données
 * @param req - L'objet de la requête.
 * @param res - l'objet de réponse
 */
export const deleteUser = (req, res) => {
  User.delete(req.params.userId, (err) => {
    if (err) {
      return res.status(500).json({ message: "Impossible de supprimer l'utilisateur" });
      next();
    }
    res.status(200).json({ message: "Utilisateur supprimé" });
  });
};

/**
 * Il récupère toutes les annonces d'un utilisateur
 * @param req - L'objet de la requête.
 * @param res - l'objet de réponse
 */
export const getAnnoncesByUser = (req, res) => {
  User.getAnnoncesByUser(req.params.userId, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Impossible de récupérer les annonces de l'utilisateur" });
      next();
    }
    res.status(200).json(result);
  });
};
