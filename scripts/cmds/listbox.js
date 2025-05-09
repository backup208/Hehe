module.exports = {
  config: {
    name: "listbox",
    version: "1.0",
    author: "Mim",
    countDown: 5,
    role: 0,
    shortDescription: "Total group count",
    longDescription: "Shows how many group chats the bot is in.",
    category: "info",
    guide: {
      en: "{p}listbox",
    },
  },

  onStart: async function ({ api, event }) {
    try {
      const threads = await api.getThreadList(100, null, ["INBOX"]);
      const groupCount = threads.filter(t => t.isGroup && t.name !== null).length;

      api.sendMessage(`🤖 MIM Bot is currently in ${groupCount} group(s).`, event.threadID);
    } catch (err) {
      console.error(err);
      api.sendMessage("Couldn't fetch group count.", event.threadID);
    }
  }
};