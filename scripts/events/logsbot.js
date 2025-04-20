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
    const logTID = "24063981609872002"; // Logs will be sent here
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

    let msg = `╔═════◇༺♡༻◇═════╗\n${isJoin ? "♻ 𝐌𝐈𝐌-𝐁𝐎𝐓 Connected ♻" : "⛔ 𝐌𝐈𝐌-𝐁𝐎𝐓 Removed ⛔"}\n╚═════◇༺♡༻◇═════╝\n\n`;

    if (isJoin) {
      msg += `✨ Bot has been added to a new group!\n➤ 𝗚𝗿𝗼𝘂𝗽 𝗡𝗮𝗺𝗲 : 『 ${threadName} 』\n➤ 𝗔𝗱𝗱𝗲𝗱 𝗕𝘆 : 『 ${authorName} 』\n`;
    } else {
      msg += `❌ Bot has been kicked from a group!\n➤ 𝗚𝗿𝗼𝘂𝗽 𝗡𝗮𝗺𝗲 : 『 ${threadName} 』\n➤ 𝗞𝗶𝗰𝗸𝗲𝗱 𝗕𝘆 : 『 ${authorName} 』\n`;
    }

    msg += `➤ 𝗨𝗦𝗘𝗥 𝗜𝗗 : ${author}\n➤ 𝗚𝗥𝗢𝗨𝗣 𝗜𝗗 : ${threadID}\n➤ 𝗧𝗜𝗠𝗘 : ${time}\n`;
    msg += `\n━━━━━━━━━━━━━━━━━━━━━━━\n⚜ 𝐁𝐎𝐓 𝐏𝐎𝗪𝐄𝗥𝗘𝗗 𝗕𝗬:\n➤ 𝐀𝐃𝐌𝐈𝐍: 𝐙𝐈𝐇𝐀𝐃 𝐀𝐇𝐌𝐄𝐃\n━━━━━━━━━━━━━━━━━━━━━━━`;

    return api.sendMessage(msg, logTID);
  }
};
