import jwt from "jsonwebtoken";
import User from "../models/User.mjs";

export const verifyToken = (req, res, next) => {
  try {
    let token = req.header("Authorization");

    // vérifie si le token est présent
    if (!token) {
      return res.status(403).json({ error: "Vous n'êtes pas autorisé, veuillez vous connecter.", code: 403 });
    }

    if (token.startsWith("Bearer ")) {
      // Supprime le mot clé Bearer du token
      token = token.slice(7, token.length).trimLeft();
    }

    // Vérifie si le token est valide et non expiré
    jwt.verify(token, process.env.JWT_SECRET_KEY, { algorithms: ["HS256"] }, (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: "Vous n'êtes pas autorisé, veuillez vous connecter.", code: 403 });
      }
      req.user = decoded;
      next();
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Autorisation échouée, veuillez vous connecter.", code: 500 });
    next();
  }
};

/**
 * Vérifie si l'utilsateur est admin
 *
 * @params { String } user_id Identifiant de l'utilisateur
 * @params { function } Callback de retour si l'ultilisateur n'est pas admin
 */
export const checkIsAdmin = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const user = await User.get(userId);
    if (!user[0].is_admin) {
      return res.status(403).json({ error: "Vous n'êtes pas autorisé, veuillez contacter l'administrateur.", code: 403 });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erreur interne du serveur", code: 500 });
    next();
  }
};
