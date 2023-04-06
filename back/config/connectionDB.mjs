import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) {
    return console.log("Erreur de connection " + err.code);
  }
  console.log("Connection à la base de données réussie !");
});

// create table users if not exists
connection.query(
  "CREATE TABLE IF NOT EXISTS users (id INT(11) AUTO_INCREMENT PRIMARY KEY, user_id VARCHAR(255) UNIQUE NOT NULL, username VARCHAR(255) NOT NULL, email VARCHAR(255) UNIQUE NOT NULL, password VARCHAR(255) NOT NULL, avatar_url VARCHAR(255) NOT NULL,created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME on UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)",
  (err, _) => {
    if (err) {
      return console.log("Erreur de création de la table users " + err.code);
    }
    console.log("Table users créée avec succès !");
  }
);

// create table annonces if not exists
connection.query(
  "CREATE TABLE IF NOT EXISTS annonces (id INT(11) AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255) NOT NULL, description LONGTEXT NOT NULL, image_url VARCHAR(255) NOT NULL, created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME on UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, user_id VARCHAR(255) NOT NULL, username VARCHAR(255) NOT NULL, avatar_url VARCHAR(255) NOT NULL)",
  (err, _) => {
    if (err) {
      return console.log("Erreur de création de la table annonces " + err.code);
    }
    console.log("Table annonces créée avec succès !");
  }
);

export default connection;
