import { writeFileSync } from "fs";
import { join } from "path";
import { SitemapStream, streamToPromise } from "sitemap";
// import { createServer } from "http";
// import { default as App } from "./src/App"; // Chemin vers votre composant racine de l'application React
// import { StaticRouter } from "react-router-dom";
// import { createElement } from "react";

async function generateSitemap() {
  // Créez une instance de SitemapStream
  const smStream = new SitemapStream({
    hostname: "https://pandorarp.fr", // Remplacez par votre nom de domaine
  });

  // Ajoutez l'URL de la page d'accueil à la sitemap
  smStream.write({
    url: "/",
  });

  // Obtenez toutes les routes de React Router DOM
  const routes = ["/", "/annonces", "/rejoindre", "/equipepandora", "/boutique", "/cgu", "/rgpd"];

  // Ajoutez toutes les routes à la sitemap
  routes.forEach((route) => {
    smStream.write({
      url: route,
    });
  });

  // Terminez la génération de la sitemap
  smStream.end();

  // Convertissez la sitemap en chaîne XML
  const sitemap = await streamToPromise(smStream).then((sm) => sm.toString());

  // Enregistrez la sitemap dans un fichier XML
  const filePath = join("public", "sitemap.xml");
  writeFileSync(filePath, sitemap);

  console.log("Sitemap générée avec succès !");
}

generateSitemap();
