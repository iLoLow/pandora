import connection from "../config/connectionDB.js";

/**
 * @class User model on the database mysql
 * @description This class is used to create, update, delete, and get users from the database.
 */
class User {
  constructor(user_id, username, email, password) {
    this.user_id = user_id;
    this.username = username;
    this.email = email;
    this.password = password;
  }

  /**
   * Cette fonction crée un nouvel utilisateur dans la base de données.
   * @param user_id - L'identifiant de l'utilisateur.
   * @param username - Le nom d'utilisateur de l'utilisateur.
   * @param email - l'email de l'utilisateur
   * @param password - le mot de passe que l'utilisateur a saisi
   * @param cb - fonction de rappel
   */
  static create(user_id, username, email, password, cb) {
    connection.query("INSERT INTO users (user_id, username, email, password) VALUES (?, ?, ?, ?)", [user_id, username, email, password], (err, result) => {
      cb(err, result);
    });
  }

  /**
   * "Obtenir un utilisateur de la base de données par son user_id."
   *
   * La première ligne de la fonction est un commentaire. C'est une bonne idée d'ajouter des commentaires
   * à votre code pour vous aider, vous et les autres, à comprendre ce que fait le code
   * @param user_id - L'user_id de l'utilisateur que vous souhaitez obtenir.
   * @param cb - fonction de rappel
   */
  static get(user_id, cb) {
    connection.query("SELECT * FROM users WHERE user_id = ?", [user_id], (err, result) => {
      cb(err, result);
    });
  }


/**
 * Il prend une adresse e-mail comme paramètre et renvoie l'objet utilisateur qui a cette adresse
 * e-mail
 * @param email - L'e-mail de l'utilisateur que vous souhaitez obtenir.
 */
  static getByEmail(email) {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  /**
   * Obtenez tous les utilisateurs de la base de données et transmettez les résultats à la fonction de
   * rappel.
   * @param cb - fonction de rappel
   */
  static getAll(cb) {
    connection.query("SELECT * FROM users", (err, results) => {
      cb(err, results);
    });
  }

  /**
   * Il met à jour le nom d'utilisateur, l'e-mail et le mot de passe de l'utilisateur dans la base de
   * données
   * @param user_id - l'identifiant de l'utilisateur que vous souhaitez mettre à jour
   * @param username - le nom d'utilisateur de l'utilisateur
   * @param email - l'email de l'utilisateur
   * @param password - le mot de passe que l'utilisateur a saisi dans le formulaire
   * @param cb - fonction de rappel
   */
  static update(user_id, username, email, password, cb) {
    connection.query("UPDATE users SET username = ?, email = ?, password = ? WHERE user_id = ?", [username, email, password, user_id], (err, results) => {
      cb(err, results);
    });
  }

  /**
   * Il supprime un utilisateur de la base de données
   * @param user_id - L'identifiant de l'utilisateur que vous souhaitez supprimer.
   * @param cb - fonction de rappel
   */
  static delete(user_id, cb) {
    connection.query("DELETE FROM users WHERE user_id = ?", [user_id], (err, results) => {
      cb(err, results);
    });
  }

  /**
   * Il récupère toutes les annonces de la base de données qui ont le même user_id que celui passé dans
   * la fonction
   * @param user_id - l'identifiant de l'utilisateur
   * @param cb - fonction de rappel
   */
  static getAnnoncesByUser(user_id, cb) {
    connection.query("SELECT * FROM annonces WHERE user_id = ?", [user_id], (err, results) => {
      cb(err, results);
    });
  }
}

export default User;
