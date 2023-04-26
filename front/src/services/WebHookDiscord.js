/**
 * Récupère les infos d'un webhook depuis la DB.api
 * @param {String} // Type de webhook (annonces | boutique)
 */
export const getInfosWebhook = (type) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/api/webhooks/" + type);
      const data = await response.json();
      if (data) {
        resolve(data);
      }
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Envoie un message sur le WebHook Discord
 * https://discord.com/developers/docs/resources/channel#embed-object
 * @param {string} url du webhook discord
 * @param {FormData} body formdata
 */
export const sendEmbedsToDiscord = async (url, body) => {
  return await new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        body: body,
      });

      if (response.status === 204) {
        resolve();
      }
      const data = await response.json();

      if (data) {
        resolve(data);
      }
    } catch (error) {
      reject(error);
    }
  });
};
