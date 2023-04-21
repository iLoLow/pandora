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

class Banner {
  constructor() {}

  static create(image_url) {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO banners (image_url) VALUES (?)", [image_url], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
      connection.release();
    });
  }
  static getAll() {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM banners", (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
      connection.release();
    });
  }

  static getById(id) {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM banners WHERE id = ?", [id], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
      connection.release();
    });
  }

  static update(id, image_url) {
    return new Promise((resolve, reject) => {
      connection.query("UPDATE banners SET image_url = ? WHERE id = ?", [image_url, id], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
      connection.release();
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      connection.query("DELETE FROM banners WHERE id = ?", [id], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
      connection.release();
    });
  }
}

export default Banner;
