module.exports = {
  config: {
    name: "addall",
    version: "1.1",
    author: "Mim Rewrite",
    countDown: 5,
    role: 2,
    shortDescription: "Add user to all groups",
    longDescription: "Only admin UID can use this to add people to all groups",
    category: "owner",
    guide: {
      en: "{pn} [optional: tag or UID]"
    }
  },

  onStart: async function ({ api, event, args }) {
    // Restrict access to specific UID only
    const allowedUID = "100067540204855";
    if (event.senderID !== allowedUID)
      return api.sendMessage("⛔ Sorry bro, only Zihad boss can use this command!", event.threadID, event.messageID);

    let targetUID = event.mentions && Object.keys(event.mentions)[0];

    if (!targetUID) {
      if (args[0] && !isNaN(args[0])) {
        targetUID = args[0]; // If UID typed
      } else {
        targetUID = event.senderID; // Fallback to sender
      }
    }

    const groupList = await api.getThreadList(100, null, ['INBOX']);
    const filteredGroups = groupList.filter(thread => thread.isGroup && thread.threadID !== event.threadID);

    let success = 0, failed = 0;

    for (const group of filteredGroups) {
      try {
        const info = await api.getThreadInfo(group.threadID);

        if (info.participantIDs.includes(targetUID)) continue;
        if (info.participantIDs.length >= 250) {
          failed++;
          continue;
        }

        await api.addUserToGroup(targetUID, group.threadID);
        success++;
      } catch (err) {
        failed++;
      }
    }

    api.sendMessage(`✅ Added to ${success} groups\n❌ Failed in ${failed} groups`, event.threadID);
  }
};
