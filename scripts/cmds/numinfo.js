const axios = require("axios");
const dipto = "https://www.noobs-api.rf.gd/dipto";

module.exports = {
  config: {
    name: "numinfo",
    version: "1.0.0",
    author: "Dipto",
    countDown: 3,
    role: 0,
    shortDescription: "Get Bangladeshi number info",
    longDescription: "Check Bangladeshi phone number owner name & type",
    category: "info",
    guide: {
      en: "{pn} 01XXXXXXXXX"
    }
  },

  onStart: async function ({ api, event, args }) {
    if (!args[0]) {
      return api.sendMessage("⚠️ দয়া করে একটি নম্বর দিন!", event.threadID, event.messageID);
    }

    let number = args[0].startsWith("01") ? "88" + args[0] : args[0];
    api.setMessageReaction("⌛", event.messageID, () => {}, true);

    try {
      const res = await axios.get(`${dipto}/numinfo?number=${number}`);
      const data = res.data;

      const msg = {
        body: data.info.map(i => `📞 Name: ${i.name}\n📋 Type: ${i.type || "Not found"}`).join("\n")
      };

      if (data.image) {
        const img = await axios.get(data.image, { responseType: "stream" });
        msg.attachment = img.data;
      }

      api.sendMessage(msg, event.threadID, event.messageID);
    } catch (e) {
      api.sendMessage(`❌ Error: ${e.message}`, event.threadID, event.messageID);
      console.log(e);
    }
  }
};