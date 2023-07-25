import Express from "express";
import * as path from "path";
import http from "http";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { fileURLToPath } from "url";
import userRoutes from "./routes/userRoutes.mjs";
import authRoutes from "./routes/authRoutes.mjs";
import adminRoutes from "./routes/adminRoutes.mjs";
import annonceRoutes from "./routes/annonceRoutes.mjs";
import imageRoutes from "./routes/imageRoutes.mjs";
import boutiqueRoutes from "./routes/boutiqueRoutes.mjs";
import abonnementRoutes from "./routes/abonnementRoutes.mjs";
import bannerRoutes from "./routes/bannerRoutes.mjs";
import webhookRoutes from "./routes/webhookRoutes.mjs";
import createFolders from "./utils/createFolders.mjs";
import defaultQueries from "./config/defaultQueries.mjs";

// Resolve dirname anf filename for es6
const __filename = fileURLToPath(import.meta.url); // Résolution du chemin du fichier
const __dirname = path.dirname(__filename); // Résolution du chemin du fichier

dotenv.config(); // Chargement des variables d'environnement

const app = Express(); // Création de l'application Express

// Parse les données en JSON
app.use(Express.json());

// Encodage des données
app.use(Express.urlencoded({ extended: true }));

const limitReached = (req, res) => {
  res.status(429).json({ error: "Trop de requêtes, veuillez réessayer dans 15 minutes !", code: 429 }); // "Too many requests, please try again in an hour!
  console.log("Trop de requêtes, veuillez réessayer dans 15 minutes !");
};

// Limite le nombre de requêtes par IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500, // Limit each IP to 500 requests per `window` (15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: limitReached, // Custom handler to send the response
});

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Accept, Accept-Language, Content-Language, Content-Type");
//   next();
// });

// Apply the rate limiting middleware to all requests
app.use("/api/*", limiter);

// Helmet vous aide à sécuriser vos applications Express en définissant diverses en-têtes HTTP.
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); // Protection contre les attaques de type Cross-Origin Resource Sharing (CORS)
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com/"],
      imgSrc: ["*", "'self'", "data: blob:"],
      connectSrc: ["'self'", "https://fonts.gstatic.com/", "https://fonts.googleapis.com/", "https://discord.com/api/webhooks/"],
    },
  })
);

// { allowedHeaders: ["Origin", "X-Requested-With", "Content", "Accept", "Content-Type", "Content-Disposition", "Authorization"] }
app.use(cors());

// journalisation pour Express (logs).
app.use(morgan("dev"));

// Creation des dossiers nécessaires aux images
createFolders();

// Définition de la route par défaut pour les assets
app.use("/images", Express.static(path.join(__dirname, "images")));

app.use("/api/thumbs", imageRoutes);

// Definition des routes d'authentification
app.use("/api/auth", authRoutes);

// Définition des routes del 'admin
app.use("/api/admin", adminRoutes);

// Definition de la route user
app.use("/api/users", userRoutes);

// Définition de la route annonce
app.use("/api/annonces", annonceRoutes);

// Définition de la route boutique
app.use("/api/boutique", boutiqueRoutes);

//Définition de la route pour les abonnements
app.use("/api/abonnement", abonnementRoutes);

// Définition de la route pour le banner
app.use("/api/banner", bannerRoutes);

// Définition de la route pour les webhooks
app.use("/api/webhooks", webhookRoutes);

// Attention ces routes doivent être définies après les routes de l'api !!! (sinon elles seront prioritaires)
// Définition du dossier de build du front (React)
app.use(Express.static(path.join(__dirname, "dist/")));

// Redirection vers le fichier index.html
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/index.html"), (err) => {
    if (err) res.status(500).json(err);
  });
});

const server = http.createServer(app);

server.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
  defaultQueries();
});
