const fs = require("fs-extra");
const path = require("path");

module.exports = {
  config: {
    name: "rsend",
    version: "5.1",
    author: "Sadman Anik + Edit by Zihad",
    countDown: 1,
    role: 0,
    shortDescription: {
      en: "Enable/Disable Anti unsend mode"
    },
    longDescription: {
      en: "Anti unsend mode with name and message resend"
    },
    category: "Admins",
    guide: {
      en: "{pn} mam (on) / man (off)"
    },
    envConfig: {
      deltaNext: 5
    }
  },

  onStart: async function ({ api, message, event, threadsData, args }) {
    if (!global.reSend) global.reSend = {};

    if (!["mam", "man"].includes(args[0]))
      return message.reply("⚠️ লিখুন: mam (চালু) অথবা man (বন্ধ)\nউদাহরণ: resend mam");

    const isOn = args[0] === "mam";
    await threadsData.set(event.threadID, isOn, "settings.reSend");

    if (isOn) {
      if (!global.reSend[event.threadID]) {
        global.reSend[event.threadID] = [];
      }
      message.reply("✅ Anti-unsend মোড চালু হয়েছে!");
    } else {
      delete global.reSend[event.threadID];
      message.reply("❌ Anti-unsend মোড বন্ধ করা হয়েছে।");
    }
  },

  onChat: async function ({ api, event, threadsData, usersData }) {
    if (!global.reSend) global.reSend = {};

    const { threadID, messageID, type, senderID } = event;

    const enable = await threadsData.get(threadID, "settings.reSend");
    if (!enable) return;

    if (type !== "message_unsend") {
      if (!global.reSend[threadID]) global.reSend[threadID] = [];
      global.reSend[threadID].push(event);

      if (global.reSend[threadID].length > 50) {
        global.reSend[threadID].shift();
      }

      return;
    }

    const msgList = global.reSend[threadID] || [];
    const deleted = msgList.find(item => item.messageID === messageID);
    if (!deleted) return;

    const name = await usersData.getName(deleted.senderID);
    let msgText = `ওই মামা ${name} এই বলদা\n`;

    if (deleted.body) msgText += `➤ ${deleted.body}\n`;

    msgText += `এই এসএমএস টা Unsend করছে 😼`;

    const resendData = { body: msgText };

    if (deleted.attachments?.length) {
      const files = [];
      for (let att of deleted.attachments) {
        const url = att.url;
        const ext = path.extname(url).split("?")[0] || ".tmp";
        const fileName = `${Date.now()}${ext}`;
        const filePath = path.join(__dirname, "cache", fileName);

        const res = await global.utils.downloadFile(url, filePath);
        if (res) files.push(fs.createReadStream(filePath));
      }
      resendData.attachment = files;
    }

    api.sendMessage(resendData, threadID);
  }
};
