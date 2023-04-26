const Url = import.meta.env.VITE_WEBHOOK_DISCORD_URL_TEST;

/**
 * Envoie un message sur le WebHook Discord
 * https://discord.com/developers/docs/resources/channel#embed-object
 * @param {Object} objectEmbeds
 */
export const sendEmbedsToDiscord = async (file) => {
  try {
    const formdata = new FormData();
    formdata.append("blob", file);
    const embed = {
      title: "hello",
      url: "attachment://" + file.filename,
    };

    const response = await fetch(Url, {
      method: "POST",
      body: formdata,
      payload: JSON.stringify({ embeds: [embed] }),
    });

    const data = await response.json();

    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const sendEmbedsToDiscordAnnonce = async (objectEmbeds) => {
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
