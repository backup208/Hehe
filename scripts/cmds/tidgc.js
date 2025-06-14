module.exports = {
  config: {
    name: "tidgc",
    version: "1.2",
    author: "_ANIK 🐢",
    role: 2,
    shortDescription: "Get group TIDs",
    longDescription: "List groups with TIDs, reply number to get only TID and remove the list message.",
    category: "admin",
    guide: {
      en: "{p}tidgc → Reply with number to get TID (list will be unsent)"
    }
  },

  allowedUIDs: [
    "100078769420993", // 1st UID
    "100022776827595"  // 2nd UID
  ],

  onStart: async function ({ api, event }) {
    if (!this.allowedUIDs.includes(event.senderID.toString()))
      return api.sendMessage("⛔ Permission denied. You are not authorized to use this command.", event.threadID);

    try {
      const threads = await api.getThreadList(100, null, ["INBOX"]);
      const groupThreads = threads.filter(t => t.isGroup && t.name !== null);

      if (groupThreads.length === 0)
        return api.sendMessage("❌ No group chats found.", event.threadID);

      const list = groupThreads.map((g, i) =>
        `${i + 1}. ${g.name}\nTID_${g.threadID}`
      ).join("\n\n");

      const msg = `📋 𝐆𝐫𝐨𝐮𝐩 𝐋𝐢𝐬𝐭𝐬 𝐰𝐢𝐭𝐡 𝐓𝐈𝐃:\n\n${list}\n\n📩 Reply with number to get only the TID.`;

      const sent = await api.sendMessage(msg, event.threadID);

      global.GoatBot.onReply.set(sent.messageID, {
        commandName: "tidgc",
        author: event.senderID,
        groupThreads,
        listMsgID: sent.messageID
      });
    } catch (err) {
      console.error(err);
      api.sendMessage("⚠️ Error getting group list.", event.threadID);
    }
  },

  onReply: async function ({ api, event, Reply }) {
    const { author, groupThreads, listMsgID } = Reply;

    if (event.senderID !== author)
      return api.sendMessage("⛔ Only the command sender can reply.", event.threadID);

    const index = parseInt(event.body.trim());
    if (isNaN(index) || index < 1 || index > groupThreads.length)
      return api.sendMessage("❌ Invalid number.", event.threadID);

    const selectedGroup = groupThreads[index - 1];

    try {
      await api.unsendMessage(listMsgID);
    } catch {
      // fail silently
    }

    return api.sendMessage(`🆔 ${selectedGroup.threadID}`, event.threadID);
  }
};
