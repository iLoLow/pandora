const Url = import.meta.env.VITE_WEBHOOK_DISCORD_URL_TEST;

/**
 * Envoie un message sur le WebHook Discord
 * https://discord.com/developers/docs/resources/channel#embed-object
 * @param {Object} objectEmbeds
 */
export const sendEmbedsToDiscord = async (objectEmbeds) => {
  try {
    const response = fetch(Url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ embeds: [objectEmbeds] }),
    });
    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.log(error);
  }
};
