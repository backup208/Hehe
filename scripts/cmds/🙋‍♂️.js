const fs = require("fs");

module.exports = {
  config: {
    name: "👻",
    version: "1.0",
    author: "ZIHAD",
    countDown: 5,
    role: 0,
    shortDescription: "no prefix",
    longDescription: "no prefix",
    category: "voice",
  },

  onStart: async function () {},

  onChat: async function ({ event, message }) {
    if (event.body) {
      const body = event.body.toLowerCase();
      const keywords = ["💁‍♂️", "🙋‍♂️", "🙋‍♀️","💁‍♀️"]; 

      if (keywords.includes(body)) {
        return message.reply({
          body: "ADMIN-ZIHAD",
          attachment: fs.createReadStream("./scripts/cmds/S1LK2/ami-ekhon-bg.mp3"),
        });
      }
    }
  },
};