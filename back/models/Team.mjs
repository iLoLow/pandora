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

/**
 *  Annonces class CRUD
 *	@description Cette classe permet de créer, récupérer, mettre à jour et supprimer des annonces
 * @class Annonces
 */
class Team {
  constructor() {}

  static create(pseudo_discord, nom_prenom_rp, fonction, description, avatar_url) {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO equipe (pseudo_discord, nom_prenom_rp, fonction, description, avatar_url) VALUES (?, ?, ?, ?, ?)",
        [pseudo_discord, nom_prenom_rp, fonction, description, avatar_url],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
      connection.query("UPDATE equipe SET order_id = LAST_INSERT_ID() WHERE id = LAST_INSERT_ID()", (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
      connection.release();
    });
  }

  static getById(id) {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM equipe WHERE id = ?", [id], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
      connection.release();
    });
  }

  static getAllByOrder() {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM equipe ORDER BY equipe.order_id ASC", (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
      connection.release();
    });
  }

  static update(id, pseudo_discord, nom_prenom_rp, fonction, description, avatar_url) {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE equipe SET pseudo_discord = ?, nom_prenom_rp = ?, fonction = ?, description = ?, avatar_url = ? WHERE id = ?",
        [pseudo_discord, nom_prenom_rp, fonction, description, avatar_url, id],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
      connection.release();
    });
  }

  static updateOrderById(id, order_id) {
    return new Promise((resolve, reject) => {
      connection.query("UPDATE equipe SET order_id = ? WHERE id = ?", [order_id, id], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
      connection.release();
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      connection.query("DELETE FROM equipe WHERE id = ?", [id], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
      connection.release();
    });
  }
}

export default Team;
