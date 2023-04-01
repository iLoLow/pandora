import { v4 } from "uuid";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

/**
 * Il crée un utilisateur dans la base de données
 * @param req - l'objet de la requête
 * @param res - l'objet de réponse
 * @param next - une fonction qui sera appelée lorsque le middleware sera terminé.
 */
export const register = async (req, res, next) => {
  const { username, email, password, avatar_url } = req.body;
  const user_id = v4();

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    User.create(user_id, username, email, hashedPassword, avatar_url, (err) => {
      if (err) {
        return res.status(400).json({ message: "Impossible de créer l'utilisateur avec cet email: " + email });
        next();
      }
      res.status(201).json({ message: "Utilisateur créé" });
    });
  } catch (err) {
    return res.status(500).json({ message: "Erreur lors de la création de l'utilisateur" });
    next();
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // on récupère l'utilisateur si il existe
    const user = await User.getByEmail(email);

    // Si l'utilisateur n'existe pas
    if (!user) return res.status(400).json({ message: "Email ou mot de passe incorrect" });

    // On vérifie le mot de passe
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Email ou mot de passe incorrect" });
      next();
    }

    // Création du token
    const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES_IN, // Expiration du token dans les variables d'environnement
    });

    // On supprime les propriétés de l'utilisateur pour ne pas les renvoyer vers le front
    delete user.id;
    delete user.password;
    delete user.created_at;
    delete user.updated_at;

    res.status(200).json({ user, token });
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la connexion de l'utilisateur" });
    next();
  }
};
