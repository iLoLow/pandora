import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

class Database {
  constructor() {
    if (!Database.instance) {
      Database.instance = this;
      Database.pool = mysql.createPool({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
      });
    }
    return Database.instance;
  }

  static connection() {
    return Database.pool;
  }

  getConnect() {
    return new Promise((resolve, reject) => {
      Database.pool.getConnection((err, connection) => {
        if (err) {
          reject(err);
        }
        resolve(connection);
      });
    });
  }
}

export default Database;
