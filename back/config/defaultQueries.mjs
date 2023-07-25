import Database from "./Database.mjs";

const db = new Database();

const defaultQueries = async () => {
  // start connection
  const connection = await db.getConnect();

  // create table users if not exists
  connection.query(
    "CREATE TABLE IF NOT EXISTS users (id INT(11) AUTO_INCREMENT PRIMARY KEY, user_id VARCHAR(255) UNIQUE NOT NULL, username VARCHAR(255) NOT NULL, email VARCHAR(255) UNIQUE NOT NULL, password VARCHAR(255) NOT NULL, avatar_url VARCHAR(255) NOT NULL,created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME on UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)",
    (err, result) => {
      if (err) {
        return console.log("Erreur de création de la table users " + err.code);
      }
      if (result.warningStatus === 0) {
        return console.log("Table users créée avec succès !");
      }
    }
  );

  // create table annonces if not exists
  connection.query(
    "CREATE TABLE IF NOT EXISTS annonces (id INT(11) AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255) NOT NULL, description LONGTEXT NOT NULL, image_url VARCHAR(255) NOT NULL, created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME on UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, user_id VARCHAR(255) NOT NULL, username VARCHAR(255) NOT NULL, avatar_url VARCHAR(255) NOT NULL)",
    (err, result) => {
      if (err) {
        return console.log("Erreur de création de la table annonces " + err.code);
      }
      if (result.warningStatus === 0) {
        return console.log("Table annonces créée avec succès !");
      }
    }
  );

  // create table boutique_items if not exist
  connection.query(
    "CREATE TABLE IF NOT EXISTS boutique_items (id INT AUTO_INCREMENT PRIMARY KEY, name_article VARCHAR(255) NOT NULL, description LONGTEXT NOT NULL, price DECIMAL(10, 2) NOT NULL, type_vehicule VARCHAR(255) NOT NULL, image_url LONGTEXT NOT NULL DEFAULT '[]', created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME on UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)",
    (err, result) => {
      if (err) {
        return console.log("Erreur de création de la table boutique_items " + err.code);
      }
      if (result.warningStatus === 0) {
        return console.log("Table boutique_items créée avec succès !");
      }
    }
  );

  // create table abonnements if not exist
  connection.query(
    "CREATE TABLE IF NOT EXISTS abonnements (id INT AUTO_INCREMENT PRIMARY KEY, name_abonnement VARCHAR(255) NOT NULL, description LONGTEXT NOT NULL, price DECIMAL(10, 2) NOT NULL, image_url LONGTEXT NOT NULL DEFAULT '[]', created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME on UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)",
    (err, result) => {
      if (err) {
        return console.log("Erreur de création de la table abonnements " + err.code);
      }
      if (result.warningStatus === 0) {
        return console.log("Table abonnements créée avec succès !");
      }
    }
  );

  // create table banners if not exist
  connection.query(
    "CREATE TABLE IF NOT EXISTS banners (id INT AUTO_INCREMENT PRIMARY KEY, image_url VARCHAR(255) NOT NULL, created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME on UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)",
    (err, result) => {
      if (err) {
        return console.log("Erreur de création de la table banners " + err.code);
      }
      if (result.warningStatus === 0) {
        return console.log("Table banners créée avec succès !");
      }
    }
  );

  // create table equipe if not exist
  connection.query(
    "CREATE TABLE IF NOT EXISTS equipe (id INT AUTO_INCREMENT PRIMARY KEY, pseudo_discord VARCHAR(255) NOT NULL, nom_prenom_rp VARCHAR(255) NOT NULL, fonction VARCHAR(255) NOT NULL, description LONGTEXT NOT NULL, avatar_url VARCHAR(255) NOT NULL, order_id INT, created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME on UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)",
    (err, result) => {
      if (err) {
        return console.log("Erreur de création de la table equipe " + err.code);
      }
      if (result.warningStatus === 0) {
        return console.log("Table equipe créée avec succès !");
      }
    }
  );

  // create table webhooks if not exist
  connection.query(
    "CREATE TABLE IF NOT EXISTS webhooks (id INT AUTO_INCREMENT PRIMARY KEY, type VARCHAR(255) NOT NULL, webhook_url VARCHAR(255) NOT NULL, server_id VARCHAR(255) NOT NULL, role_id VARCHAR(255) NOT NULL, active BOOLEAN NOT NULL DEFAULT false, created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME on UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)",
    (err, result) => {
      if (err) {
        return console.log("Erreur de création de la table webhooks " + err.code);
      }
      if (result.warningStatus === 0) {
        return console.log("Table webhooks créée avec succès !");
      }
    }
  );

  // end connection
  connection.release();
};

export default defaultQueries;
