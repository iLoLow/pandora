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

  static create(type, webhook_url, server_id, role_id) {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO webhooks (type, webhook_url, server_id, role_id) VALUES (?, ?, ?, ? )", [type, webhook_url, server_id, role_id], (err, result) => {
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

  static getWebhookbyType(type) {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM webhooks WHERE type=?", [type], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
      connection.release();
    });
  }

  static activate(type, active) {
    return new Promise((resolve, reject) => {
      connection.query("UPDATE webhooks SET active = ? WHERE type = ?", [active, type], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
      connection.release();
    });
  }

  static delete(type) {
    return new Promise((resolve, reject) => {
      connection.query("DELETE FROM webhooks WHERE type = ?", [type], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
      connection.release();
    });
  }
}

export default Webhook;
