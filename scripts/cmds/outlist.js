module.exports = {
  config: {
    name: "outlist",
    version: "1.0",
    author: "Mim",
    countDown: 5,
    role: 2,
    shortDescription: "Bot leave groups by choosing from list",
    longDescription: "List all groups where the bot is in, and leave based on selected number.",
    category: "admin",
    guide: {
      en: "{p}out → reply with number to leave",
    },
  },

  onStart: async function ({ api, event }) {
    try {
      const threads = await api.getThreadList(50, null, ["INBOX"]);
      const groupThreads = threads.filter(t => t.isGroup && t.name !== null);

      if (groupThreads.length === 0)
        return api.sendMessage("Bot is not in any group chat.", event.threadID);

      const list = groupThreads.map((g, i) =>
        `${i + 1}. ${g.name}\nTID: ${g.threadID}`
      ).join("\n\n");

      const msg = `📂 𝐆𝐫𝐨𝐮𝐩 𝐥𝐢𝐬𝐭𝐬 𝐛𝐨𝐭 𝐢𝐬 𝐢𝐧:\n\n${list}\n\nReply with the number to remove the bot from that group.`;

      const sent = await api.sendMessage(msg, event.threadID);
      global.GoatBot.onReply.set(sent.messageID, {
        commandName: "out",
        author: event.senderID,
        groupThreads
      });
    } catch (err) {
      console.error(err);
      api.sendMessage("Something went wrong!", event.threadID);
    }
  },

  onReply: async function ({ api, event, Reply }) {
    const { author, groupThreads } = Reply;
    if (event.senderID !== author) return;

    const index = parseInt(event.body);
    if (isNaN(index) || index < 1 || index > groupThreads.length) {
      return api.sendMessage("Invalid number. Try again.", event.threadID);
    }

    const targetThread = groupThreads[index - 1];
    try {
      await api.removeUserFromGroup(api.getCurrentUserID(), targetThread.threadID);
      api.sendMessage(`✅ Left the group: ${targetThread.name}`, event.threadID);
    } catch (err) {
      console.error(err);
      api.sendMessage("❌ Failed to leave the group. Maybe bot isn't admin?", event.threadID);
    }

    global.GoatBot.onReply.delete(event.messageID);
  }
};