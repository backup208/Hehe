const axios = require("axios");

module.exports = {
  config: {
    name: "cdp",
    aliases: ["coupledp"],
    version: "0.2",
    role: 0,
    author: "UPoL 🐔",
    category: "Image",
    shortDescription: {
      en: "Get random Couple DPs"
    },
    longDescription: {
      en: "Fetches a random couple display picture set (boy & girl) from an external API."
    },
    guide: {
      en: "{pn}"
    },
    cooldown: 10,
  },

  onStart: async function ({ api, event, message }) {
    const { threadID, messageID } = event;
    const apiUrl = "https://upol-cdp.onrender.com/coupleDP";

    let waitMsgID = null;

    try {
      const waitMessage = await message.reply("💑 Fetching a lovely couple DP for you, please wait...");
      waitMsgID = waitMessage?.messageID;

      const response = await axios.get(apiUrl, { timeout: 10000 });

      if (response.status === 200 && response.data) {
        const apiData = response.data;
        const imageAuthor = apiData.author;

        if (apiData.images && apiData.images.girl && apiData.images.boy) {
          const girlImageStream = (await axios({ url: apiData.images.girl, responseType: 'stream' })).data;
          const boyImageStream = (await axios({ url: apiData.images.boy, responseType: 'stream' })).data;

          const attachments = [girlImageStream, boyImageStream];

          await message.reply({
            body: `Here's a beautiful couple DP for you! 💕\n\n✨ Images provided by MIM BOT`,
            attachment: attachments
          });

          if (waitMsgID) {
            setTimeout(() => {
              api.unsendMessage(waitMsgID);
            }, 1000);
          }
        } else {
          await message.reply("💔 The API returned data but image URLs are missing. Please try again later.");
        }
      } else {
        await message.reply("💔 Could not fetch data from the Couple DP API. The server might be down or returned an error.");
      }
    } catch (error) {
      if (waitMsgID) {
        api.unsendMessage(waitMsgID);
      }

      console.error("Error in CDP command:", error.message);

      if (error.code === 'ECONNABORTED') {
        await message.reply("💔 Oops! The request to the Couple DP API timed out. Please try again in a moment.");
      } else if (error.response) {
        await message.reply(`💔 The Couple DP API returned an error (${error.response.status}). Please try again later.`);
      } else if (error.request) {
        await message.reply("💔 No response from the Couple DP API. It might be temporarily unavailable.");
      } else {
        await message.reply("💔 An unexpected error occurred while fetching the couple DP. Please try again later.");
      }
    }
  }
};