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
class Annonce {
  constructor() {}

  /**
   * Il crée une nouvelle annonce dans la base de données
   * @param user_id - l'identifiant de l'utilisateur qui a créé l'annonce
   * @param title - Le titre de l'annonce
   * @param description - La description de l'annonce
   * @param image_url - l'url de l'image
   * @returns Le résultat de la requête.
   */
  static create(title, description, image_url, user_id, username, avatar_url) {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO annonces (title, description, image_url, user_id, username, avatar_url) VALUES (?, ?, ?, ?, ?, ?)",
        [title, description, image_url, user_id, username, avatar_url],
        (err, result) => {
          console.log(result);
          if (err) reject(err);
          resolve(result);
        }
      );
      connection.release();
    });
  }

  /**
   * Récupère toutes les annonces de la base de données
   * @returns Une promesse
   */
  static getAll() {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM annonces ORDER BY annonces.updated_at DESC", (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
      connection.release();
    });
  }

  /**
   * Récupère une annonce de la base de données
   * @param id - l'id de l'annonce à récupérer
   * @returns Une promesse
   * @description Cette méthode est utilisée pour récupérer une annonce pour l'afficher dans la page
   * annonce
   */
  static getById(id) {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM annonces WHERE id = ?", [id], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
      connection.release();
    });
  }

  /**
   * Il renvoie une promesse qui se résout en un tableau de toutes les annonces appartenant à un
   * utilisateur
   * @param user_id - l'identifiant de l'utilisateur qui a posté l'annonce
   * @returns Un tableau d'objets
   * @description Cette méthode est utilisée pour récupérer les annonces d'un utilisateur
   * pour les afficher dans son profil
   */
  static getLast({ limit = 1 }) {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM annonces ORDER BY updated_at DESC LIMIT ${limit}`, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
      connection.release();
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
      connection.query("SELECT * FROM annonces WHERE user_id = ? ORDER BY updated_at DESC", [user_id], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
      connection.release();
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
      connection.query("UPDATE annonces SET title = ?, description = ?, image_url = ? WHERE id = ?", [title, description, image_url, id], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
      connection.release();
    });
  }

  /**
   * Il supprime une annonce de la base de données
   * @param id - l'id de l'annonce à supprimer
   * @returns Le résultat de la requête.
   */
  static delete(id) {
    return new Promise((resolve, reject) => {
      connection.query("DELETE FROM annonces WHERE id = ?", [id], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
      connection.release();
    });
  }

  /**
   * Il met à jour la base de données avec les nouvelles valeurs des champs liked_users, disliked_users
   * pour la ligne dont l'id est égal à l'id passé en paramètre
   * @param id - l'id de l'annonce à mettre à jour
   * @param visitorId - l'id de l'utilisateur qui a liké ou disliké l'annonce
   * @param isLiked - true si l'utilisateur a liké l'annonce, false sinon
   * @param isDisliked - true si l'utilisateur a disliké l'annonce, false sinon
   * @returns Le résultat de la requête.
   * @description Cette méthode est utilisée pour liker ou disliker une annonce
   */
  static async likeOrDislike(id, visitorId, isLiked, isDisliked) {
    const annonce = await this.getById(id);
    return new Promise((resolve, reject) => {
      const likedUsers = JSON.parse(annonce[0].liked_users);
      const dislikedUsers = JSON.parse(annonce[0].disliked_users);

      const isLikedUsers = !!likedUsers.find((user) => user === visitorId);
      const isDislikedUsers = !!dislikedUsers.find((user) => user === visitorId);

      const actions = {
        like: () => {
          if (!isDislikedUsers) {
            likedUsers.push(visitorId);
          }
        },
        dislike: () => {
          if (!isLikedUsers) {
            dislikedUsers.push(visitorId);
          }
        },
        likeAndDislike: () => {
          likedUsers.splice(likedUsers.indexOf(visitorId), 1);
          dislikedUsers.push(visitorId);
        },
        dislikeAndLike: () => {
          dislikedUsers.splice(dislikedUsers.indexOf(visitorId), 1);
          likedUsers.push(visitorId);
        },
      };

      switch (true) {
        case isLiked && !isDisliked && !isDislikedUsers:
          actions.like();
          break;
        case isDisliked && !isLiked && !isLikedUsers:
          actions.dislike();
          break;
        case isDisliked && isLikedUsers:
          actions.likeAndDislike();
          break;
        case isLiked && isDislikedUsers:
          actions.dislikeAndLike();
          break;
      }

      const updatedAt = annonce[0].updated_at; // !! on renvoi la date de mise à jour pour eviter la mise à jour de l'annonce pendant les likes et dislikes
      const likedUsersToSave = JSON.stringify(likedUsers);
      const dislikedUsersToSave = JSON.stringify(dislikedUsers);

      connection.query(
        "UPDATE annonces SET liked_users = ?, disliked_users = ?, updated_at = ? WHERE id = ?",
        [likedUsersToSave, dislikedUsersToSave, updatedAt, id],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
      connection.release();
    });
  }
}

export default Annonce;
