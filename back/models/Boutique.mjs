import Database from "../config/Database.mjs";

const db = new Database();

const connection = await db.getConnect();

connection.on("error", async (err) => {
  console.log("db error", err);
  if (err.code === "PROTOCOL_CONNECTION_LOST") {
    // restart the connection
    connection = await db.getConnect();
  } else {
    throw err;
  }
});
class Boutique extends Database {
  constructor() {}

  //creation d'un article de la boutique dans la base de données
  static create(name_article, description, price, image_url, boutique_id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO boutique_items (name_article, description, price, image_url, boutique_id) VALUES (?, ?, ?, ?, ?)",
        [name_article, description, price, image_url, boutique_id],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
      connection.release();
    });
  }
  //récupération de tous les articles de la boutique
  static getAll() {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM boutique_items ORDER BY boutique_items.updated_at DESC", (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
      connection.release();
    });
  }
  //récupération d'un article de la boutique
  static getOne(id) {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM boutique_items WHERE id = ?", [id], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
      connection.release();
    });
  }
  //mise à jour d'un article de la boutique
  static update(id, name_article, description, price, image_url, boutique_id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE boutique_items SET name_article = ?, description = ?, price = ?, image_url = ?, boutique_id = ? WHERE id = ?",
        [name_article, description, price, image_url, boutique_id, id],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
      connection.release();
    });
  }
  //suppression d'un article de la boutique
  static delete(id) {
    return new Promise((resolve, reject) => {
      connection.query("DELETE FROM boutique_items WHERE id = ?", [id], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
      connection.release();
    });
  }
}

export default Boutique;
