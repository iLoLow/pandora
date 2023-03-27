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
  const { username, email, password } = req.body;
  const user_id = v4();

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    User.create(user_id, username, email, hashedPassword, (err) => {
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
  const { email, password } = req.body;

  // on récupère l'utilisateur si il existe
  const user = await User.getByEmail(email);

  // Si l'utilisateur n'existe pas
  if (!user[0]) {
    return res.status(400).json({ message: "Email ou mot de passe incorrect" });
    next();
  }

  const validPassword = await bcrypt.compare(password, user[0].password);
  if (!validPassword) {
    return res.status(400).json({ message: "Email ou mot de passe incorrect" });
    next();
  }

  // Création du token
  const token = jwt.sign({ userId: user[0].user_id }, process.env.JWT_SECRET_KEY, {
    expiresIn: 86400, // 24 heures
  });

  return res.header("auth-token", token).json({ token });
};
