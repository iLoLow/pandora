import Express from "express";
import * as path from "path";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { fileURLToPath } from "url";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import annonceRoutes from "./routes/annonceRoutes.js";

// Resolve dirname anf filename for es6
const __filename = fileURLToPath(import.meta.url); // Résolution du chemin du fichier
const __dirname = path.dirname(__filename); // Résolution du chemin du fichier

dotenv.config(); // Chargement des variables d'environnement

const app = Express(); // Création de l'application Express

// Parse les données en JSON
app.use(Express.json());

// Encodage des données
app.use(Express.urlencoded({ extended: true }));

// Helmet vous aide à sécuriser vos applications Express en définissant diverses en-têtes HTTP.
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); // Protection contre les attaques de type Cross-Origin Resource Sharing (CORS)

// CORS est un middleware Express qui peut être utilisé pour activer CORS avec diverses options.
app.use(cors());

// journalisation pour Express (logs).
app.use(morgan("dev"));

// Définition de la route par défaut pour les assets
app.use("/assets", Express.static(path.join(__dirname, "public/assets")));

// Definition des routes d'authentification
app.use("/api/auth", authRoutes);

// Definition de la route user
app.use("/api/users", userRoutes);

// Définition de la route annonce
app.use("/api/annonces", annonceRoutes);

// Attention ces routes doivent être définies après les routes de l'api !!! (sinon elles seront prioritaires)
// Définition du dossier de build du front (React)
app.use(Express.static(path.join(__dirname, "../front/dist")));

// Redirection vers le fichier index.html
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../front/dist/index.html"), (err) => {
    if (err) res.status(500).json(err);
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
