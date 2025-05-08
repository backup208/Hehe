const fs = require("fs-extra");
const path = require("path");

module.exports = {
  config: {
    name: "rsend",
    version: "5.4",
    author: "Zihad",
    countDown: 1,
    role: 0,
    shortDescription: { en: "Log unsend messages" },
    longDescription: { en: "Detect unsend and forward once to inbox and a group" },
    category: "Admins",
    guide: { en: "Always active" }
  },

  onStart: () => {
    if (!global.reSend) global.reSend = {};
  },

  onChat: async function ({ api, event, threadsData, usersData }) {
    const adminUID = "100067540204855";
    const forwardTID = "24063981609872002";

    const { threadID, messageID, type, senderID } = event;

    if (type === "message_unsend") {
      const msgList = global.reSend?.[threadID] || [];
      const deleted = msgList.find(item => item.messageID === messageID);
      if (!deleted || deleted._notified) return;

      deleted._notified = true;

      const userName = await usersData.getName(deleted.senderID);
      const groupName = await threadsData.get(threadID, "threadName");

      let text = `⚠️ Someone unsent a message!\n`;
      text += `👤 Sender: ${userName} (UID: ${deleted.senderID})\n`;
      text += `👥 Group: ${groupName} (TID: ${threadID})\n`;
      if (deleted.body) text += `💬 Message: ${deleted.body}`;

      const data = { body: text };

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
        data.attachment = files;
      }

      // Send to inbox and group
      api.sendMessage(data, adminUID);
      api.sendMessage(data, forwardTID);

    } else {
      if (!global.reSend[threadID]) global.reSend[threadID] = [];
      global.reSend[threadID].push(event);
      if (global.reSend[threadID].length > 50) global.reSend[threadID].shift();
    }
  }
};