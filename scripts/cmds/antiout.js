module.exports = {
  config: {
    name: "antiout",
    version: "1.0",
    author: "AceGun",
    countDown: 5,
    role: 0,
    shortDescription: "Prevent members from leaving the group",
    longDescription: "Automatically adds back users who leave the group (requires bot to be admin).",
    category: "boxchat",
    guide: "{pn} [on | off]",
    envConfig: {
      deltaNext: 5
    }
  },

  onStart: async function({ message, event, threadsData, args }) {
    const currentStatus = await threadsData.get(event.threadID, "settings.antiout");
    if (!["on", "off"].includes(args[0])) {
      return message.reply("❌ Please use:\n- `antiout on` to enable\n- `antiout off` to disable");
    }

    const newStatus = args[0] === "on";
    await threadsData.set(event.threadID, newStatus, "settings.antiout");
    return message.reply(`✅ Antiout has been ${newStatus ? "enabled" : "disabled"} successfully.`);
  },

  onEvent: async function({ api, event, threadsData }) {
    const antiout = await threadsData.get(event.threadID, "settings.antiout");

    if (
      antiout &&
      event.logMessageType === "log:unsubscribe" &&
      event.logMessageData?.leftParticipantFbId &&
      event.logMessageData.leftParticipantFbId !== api.getCurrentUserID()
    ) {
      const userId = event.logMessageData.leftParticipantFbId;

      try {
        await api.addUserToGroup(userId, event.threadID);
        await api.sendMessage(
          `😼 You tried to escape? Added you back to the group!`,
          event.threadID
        );
      } catch (err) {
        console.log(`❌ Failed to add user (${userId}) back to the group. Make sure the bot is an admin.`);
      }
    }
  }
};
