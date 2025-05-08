const moment = require("moment-timezone");

module.exports = {
  config: {
    name: "logsbot",
    isBot: true,
    version: "1.4",
    author: "NTKhang & Zihad Ahmed",
    envConfig: {
      allow: true
    },
    category: "events"
  },

  onStart: async ({ usersData, threadsData, event, api }) => {
    const { logMessageType, logMessageData, threadID, author } = event;
    const botID = api.getCurrentUserID();
    const logTID = "9591096734342176";
    if (author == botID) return;

    let isJoin = (logMessageType == "log:subscribe" && logMessageData.addedParticipants.some(item => item.userFbId == botID));
    let isKick = (logMessageType == "log:unsubscribe" && logMessageData.leftParticipantFbId == botID);

    if (!isJoin && !isKick) return;

    const time = moment().tz("Asia/Dhaka").format("DD/MM/YYYY hh:mm:ss A");
    let threadName = "";
    try {
      threadName = (await api.getThreadInfo(threadID)).threadName || "Unnamed Group";
    } catch (e) {
      threadName = "Unknown Group";
    }

    const authorName = await usersData.getName(author);

    let msg = `╭──⭓ ᴍɪᴍ-ʙᴏᴛ ʟᴏɢꜱ\n│\n`;

    if (isJoin) {
      msg += `│ ✅ ʙᴏᴛ ᴊᴏɪɴᴇᴅ ᴀ ɢʀᴏᴜᴘ\n│ 📌 ɢʀᴏᴜᴘ: ${threadName}\n│ ➕ ᴀᴅᴅᴇᴅ ʙʏ: ${authorName}`;
    } else {
      msg += `│ ❌ ʙᴏᴛ ᴡᴀꜱ ʀᴇᴍᴏᴠᴇᴅ\n│ 📌 ɢʀᴏᴜᴘ: ${threadName}\n│ ➖ ʀᴇᴍᴏᴠᴇᴅ ʙʏ: ${authorName}`;
    }

    msg += `\n│ 🆔 ᴜꜱᴇʀ: ${author}\n│ 🆔 ɢʀᴏᴜᴘ ɪᴅ: ${threadID}\n│ 🕒 ᴛɪᴍᴇ: ${time}`;
    msg += `\n╰──⭓ ᴀᴅᴍɪɴ: ᴢɪʜᴀᴅ ᴀʜᴍᴇᴅ`;

    return api.sendMessage(msg, logTID);
  }
};
