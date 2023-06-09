import * as fs from "fs/promises";
import * as path from "path";
import { fileURLToPath } from "url";

// Resolve dirname anf filename for es6
const __filename = fileURLToPath(import.meta.url); // Résolution du chemin du fichier
const __dirname = path.dirname(__filename); // Résolution du chemin du fichier

const createFolders = async () => {
  const imagesPath = path.join(__dirname, "../images");

  // path banner
  const bannerPath = path.join(__dirname, "../images/banner");

  // path avatar
  const avatarsPath = path.join(__dirname, "../images/avatars");

  // paths annonces
  const annoncesPath = path.join(__dirname, "../images/annonces");
  const annoncesThumbsPath = path.join(__dirname, "../images/annonces/thumbs");

  // paths boutique
  const boutiquePath = path.join(__dirname, "../images/boutique");
  const boutiqueThumbsPath = path.join(__dirname, "../images/boutique/thumbs");

  //path abonnement
  const abonnementPath = path.join(__dirname, "../images/abonnement");
  const abonnementThumbsPath = path.join(__dirname, "../images/abonnement/thumbs");

  // creation du dossier images
  const imagesPathExists = await fs
    .access(imagesPath)
    .then(() => true)
    .catch(() => false);
  if (!imagesPathExists) {
    await fs.mkdir(imagesPath);
  }
  // creation du dossier banner
  const bannerPathExists = await fs
    .access(bannerPath)
    .then(() => true)
    .catch(() => false);
  if (!bannerPathExists) {
    await fs.mkdir(bannerPath);
  }

  // creation du dossier avatars
  const avatarsPathExists = await fs
    .access(avatarsPath)
    .then(() => true)
    .catch(() => false);
  if (!avatarsPathExists) {
    await fs.mkdir(avatarsPath);
  }

  // creation du dossier annonces
  const annoncesPathExists = await fs
    .access(annoncesPath)
    .then(() => true)
    .catch(() => false);
  if (!annoncesPathExists) {
    await fs.mkdir(annoncesPath);
  }

  // creation du dossier annonces/thumbs
  const annoncesThumbsPathExists = await fs
    .access(annoncesThumbsPath)
    .then(() => true)
    .catch(() => false);
  if (!annoncesThumbsPathExists) {
    await fs.mkdir(annoncesThumbsPath);
  }

  // creation du dossier boutique
  const boutiquePathExists = await fs
    .access(boutiquePath)
    .then(() => true)
    .catch(() => false);
  if (!boutiquePathExists) {
    await fs.mkdir(boutiquePath);
  }

  // creation du dossier boutique/thumbs
  const boutiqueThumbsPathExists = await fs
    .access(boutiqueThumbsPath)
    .then(() => true)
    .catch(() => false);
  if (!boutiqueThumbsPathExists) {
    await fs.mkdir(boutiqueThumbsPath);
  }

  // creation du dossier abonnement
  const abonnementPathExists = await fs
    .access(abonnementPath)
    .then(() => true)
    .catch(() => false);
  if (!abonnementPathExists) {
    await fs.mkdir(abonnementPath);
  }

  // creation du dossier abonnement/thumbs
  const abonnementThumbsPathExists = await fs
    .access(abonnementThumbsPath)
    .then(() => true)
    .catch(() => false);
  if (!abonnementThumbsPathExists) {
    await fs.mkdir(abonnementThumbsPath);
  }
};
//creation des dossiers necessaires aux images
export default createFolders;
