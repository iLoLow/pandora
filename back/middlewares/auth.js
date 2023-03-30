import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    let token = req.header("Authorization");

    // vérifie si le token est présent
    if (!token) {
      return res.status(403).json({ message: "Vous n'êtes pas autorisé, veuillez vous connecter." });
    }

    if (token.startsWith("Bearer ")) {
      // Supprime le mot clé Bearer du token
      token = token.slice(7, token.length).trimLeft();
    }
    // Vérifie si le token est valide et non expiré
    req.user = jwt.verify(token, process.env.JWT_SECRET_KEY);
    next();
  } catch (e) {
    res.status(500).json({ message: "Autorisation échouée, veuillez vous connecter." });
  }
};
