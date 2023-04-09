import mysql from "mysql2";

class Database {
  constructor() {}

  static connection() {
    return mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
  }

  static connectionStart() {
    this.connection().connect((err) => {
      if (err) {
        return console.log("Erreur de connection " + err.code);
      }
      console.log("Connection à la base de données réussie !");
    });
  }

  static connectionEnd() {
    this.connection().end((err) => {
      if (err) {
        return console.log("Erreur de déconnection " + err.code);
      }
      console.log("Déconnection de la base de données réussie !");
    });
  }
}

export default Database;
