const axios = require('axios');
const fs = require('fs-extra');

module.exports = {
  config: {
    name: "create",
    aliases: ["genimage", "aiimg"],
    version: "1.0",
    author: "Islamick Chat",
    countDown: 2,
    role: 0,
    shortDescription: "Generate AI image",
    longDescription: "Generate AI image from text using Pollinations API",
    category: "image",
    guide: {
      en: "{pn} <prompt text>\nExample: {pn} fantasy village in sky"
    }
  },

  onStart: async function ({ api, event, args }) {
    const { threadID, messageID } = event;

    const prompt = args.join(" ");
    if (!prompt) {
      return api.sendMessage("❌ | Please enter a prompt to generate image.\nExample: create fantasy dragon flying in sunset", threadID, messageID);
    }

    const path = __dirname + `/cache/create_ai.png`;

    try {
      const res = await axios.get(`https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`, {
        responseType: "arraybuffer"
      });

      fs.writeFileSync(path, Buffer.from(res.data, "utf-8"));

      api.sendMessage({
        body: "✅ | Successfully created your AI image:",
        attachment: fs.createReadStream(path)
      }, threadID, () => fs.unlinkSync(path), messageID);

    } catch (err) {
      api.sendMessage("❌ | Failed to generate image.\n" + err.message, threadID, messageID);
    }
  }
};