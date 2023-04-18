import { v4 } from "uuid";
import bcrypt from "bcrypt";
import User from "../models/User.mjs";
import jwt from "jsonwebtoken";

/**
 * Il crée un utilisateur dans la base de données
 * @param req - l'objet de la requête
 * @param res - l'objet de réponse
 * @param next - une fonction qui sera appelée lorsque le middleware sera terminé.
 */
export const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const avatar_url = "/" + req.file.destination + "/" + req.file.originalname;
    const user_id = v4();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const savedUser = await User.create(user_id, username, email, hashedPassword, avatar_url);

    console.log(savedUser);

    if (!savedUser);

    res.status(201).json({ message: "Votre compte a bien été créé. Vous pouvez maintenant vous connecter.", code: 201 });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ error: "Impossible de créer l'utilisateur avec cet email: " + email, code: 400 });
      next();
    }
    return res.status(500).json({ error: "Erreur lors de la création de l'utilisateur", code: 500 });
    next();
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // on récupère l'utilisateur si il existe
    const user = await User.getByEmail(email);

    // Si l'utilisateur n'existe pas
    if (!user) return res.status(400).json({ error: "Email ou mot de passe incorrect", code: 400 });

    // On vérifie le mot de passe
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: "Email ou mot de passe incorrect", code: 400 });
      next();
    }

    // Création du token
    const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES_IN, // Expiration du token dans les variables d'environnement
    });

    // On supprime les propriétés de l'utilisateur pour ne pas les renvoyer vers le front
    delete user.id;
    delete user.password;

    res.status(200).json({ message: "Connexion réussi.", user, token, code: 200 });
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la connexion de l'utilisateur", code: 500 });
    next();
  }
};
