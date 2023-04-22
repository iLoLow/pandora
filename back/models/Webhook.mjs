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

class Webhook {
  constructor() {}

  static create(webhook_url, is_active) {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO webhooks (webhook_url, is_active) VALUES (?, ?)", [webhook_url, is_active], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
      connection.release();
    });
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM webhooks", (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
      connection.release();
    });
  }

  static getById(id) {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM webhooks WHERE id = ?", [id], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
      connection.release();
    });
  }

  static update(id, webhook_url, is_active) {
    return new Promise((resolve, reject) => {
      connection.query("UPDATE webhooks SET webhook_url = ?, is_active = ? WHERE id = ?", [webhook_url, is_active, id], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
      connection.release();
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      connection.query("DELETE FROM webhooks WHERE id = ?", [id], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
      connection.release();
    });
  }
}

export default Webhook;
