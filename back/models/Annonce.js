import connection from "../config/connectionDB.js";

/**
 *  Annonces class CRUD
 *	@description This class is used to create, read, update and delete Annonces
 * @class Annonces
 */
class Annonce {
  constructor(id, title, description, image_url) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.image_url = image_url;
  }

  /**
   * Il crée une nouvelle annonce dans la base de données
   * @param user_id - l'identifiant de l'utilisateur qui a créé l'annonce
   * @param title - Le titre de l'annonce
   * @param description - La description de l'annonce
   * @param image_url - l'url de l'image
   * @returns Le résultat de la requête.
   */
  static create(user_id, title, description, image_url) {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO Annonces (user_id, title, description, image_url) VALUES (?, ?, ?, ?)", [user_id, title, description, image_url], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  /**
   * Il renvoie une promesse qui se résout en résultat d'une requête qui sélectionne toutes les colonnes
   * de la table Annonces où l'id est égal à l'id passé en paramètre
   * @param id - l'identifiant de l'annonce que vous souhaitez obtenir
   * @returns Le résultat de la requête.
   */
  static get(id) {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM Annonces WHERE id = ?", [id], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  /**
   * Récupère toutes les annonces de la base de données
   * @returns Une promesse
   */
  static getAll() {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM Annonces ORDER BY updated_at DESC", (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  static getLast({ limit = 1}) {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM Annonces ORDER BY updated_at DESC LIMIT ${limit}`, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  /**
   * Il renvoie une promesse qui se résout en un tableau de toutes les annonces appartenant à un
   * utilisateur
   * @param user_id - l'identifiant de l'utilisateur qui a posté l'annonce
   * @returns Un tableau d'objets
   */
  static getAllByUser(user_id) {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM Annonces  WHERE user_id = ? ORDER BY updated_at DESC", [user_id], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  /**
   * Il met à jour la base de données avec les nouvelles valeurs des champs title, description, imageUrl
   * pour la ligne dont l'id est égal à l'id passé en paramètre
   * @param id - l'id de l'annonce à mettre à jour
   * @returns Le résultat de la requête.
   */
  static update(id, title, description, image_url) {
    return new Promise((resolve, reject) => {
      connection.query("UPDATE Annonces SET title = ?, description = ?, image_url = ? WHERE id = ?", [title, description, image_url, id], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  /**
   * Il supprime une annonce de la base de données
   * @param id - l'id de l'annonce à supprimer
   * @returns Le résultat de la requête.
   */
  static delete(id) {
    return new Promise((resolve, reject) => {
      connection.query("DELETE FROM Annonces WHERE id = ?", [id], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }
}

export default Annonce;
