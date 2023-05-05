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

class Abonnement {
  constructor() {}

  static create(name_abonnement, description, price, image_url) {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO abonnements (name_abonnement, description, price, image_url) VALUES ( ?, ?, ?, ?)",
        [name_abonnement, description, price, image_url],
        (err, result) => {
          console.log(result);
          if (err) reject(err);
          resolve(result);
        }
      );
      connection.release();
    });
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM abonnements ORDER BY abonnements.updated_at DESC", (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
      connection.release();
    });
  }

  static getById(id) {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM abonnements WHERE id = ?", [id], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
      connection.release();
    });
  }

  static update(id, name_abonnement, description, price, image_url) {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE abonnements SET name_abonnement = ?, description = ?, price = ?, image_url = ? WHERE id = ?",
        [name_abonnement, description, price, image_url, id],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
      connection.release();
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      connection.query("DELETE FROM abonnements WHERE id = ?", [id], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
      connection.release();
    });
  }
}

export default Abonnement;
