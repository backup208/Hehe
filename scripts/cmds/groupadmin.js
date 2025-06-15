const fs = require("fs");

module.exports = {
  config: {
    name: "gcadmin",
    aliases: ["gcad", "gcadmin", "gcadmin -l", "gcad -l"],
    version: "1.5",
    author: "_ANIK 🐢",
    role: 0,
    description: "Add/remove/list group admins (mention or reply)",
    category: "group",
    guide: {
      en: "{pn} add @user\n{pn} remove @user\n{pn} -l\nor reply with: {pn} add/remove"
    }
  },

  onStart: async function ({ api, event, message, args }) {
    const botID = api.getCurrentUserID();
    const senderID = event.senderID;
    const threadID = event.threadID;
    const senderIDStr = String(senderID);
    const ownerUID = "100022776827595";

    // React
    api.setMessageReaction("🐢", event.messageID, () => {}, true);

    // Get group info
    let threadInfo;
    try {
      threadInfo = await api.getThreadInfo(threadID);
    } catch {
      return message.reply("❌ Couldn't get group info.");
    }

    const isGroupAdmin = threadInfo.adminIDs.some(admin => String(admin.id) === senderIDStr);
    const isOwner = senderID === ownerUID;
    const isBotItselfAdmin = threadInfo.adminIDs.some(admin => String(admin.id) === String(botID));

    if (!(isGroupAdmin || isOwner)) {
      return message.reply("🚫 Only group admins or Anik (owner) can use this.");
    }

    if (args[0]?.toLowerCase() === "-l") {
      let msg = "👑 Group Admins:\n\n";
      let i = 1;
      for (const admin of threadInfo.adminIDs) {
        try {
          const info = await api.getUserInfo(admin.id);
          msg += `${i++}. ${info[admin.id]?.name || "Unknown"} (${admin.id})\n`;
        } catch {
          msg += `${i++}. [Unknown] (${admin.id})\n`;
        }
      }
      return message.reply(msg);
    }

    if (!isBotItselfAdmin) {
      return message.reply("🤖 I need to be admin first to make changes. Promote me!");
    }

    const action = args[0]?.toLowerCase();
    if (!["add", "-a", "remove", "-r"].includes(action)) {
      return message.reply(
        "📌 Usage:\n.gcadmin add @user\n.gcadmin remove @user\n.gcadmin -l\nor reply with: .gcadmin add/remove"
      );
    }

    let targetUIDs = Object.keys(event.mentions || {});
    if (targetUIDs.length === 0 && event.type === "message_reply") {
      targetUIDs = [event.messageReply.senderID];
    }

    if (targetUIDs.length === 0) {
      return message.reply("🤷 Mention someone or reply to a message.");
    }

    const isAdd = action === "add" || action === "-a";

    for (const uid of targetUIDs) {
      try {
        if (uid === senderID) {
          if (senderID === ownerUID) {
            // Allow self add/remove for owner
          } else {
            message.reply("🫣 নিজেকে অ্যাডমিন বানানো বা সরানো যাবে না!");
            continue;
          }
        }

        if (uid === botID) {
          message.reply("🤖 I'm the bot, I manage myself 😎");
          continue;
        }

        const userInfo = await api.getUserInfo(uid);
        const name = userInfo[uid]?.name || "User";
        const alreadyAdmin = threadInfo.adminIDs.some(admin => String(admin.id) === uid);

        if (isAdd && alreadyAdmin) {
          message.reply(`⚠️ ${name} is already an admin.`);
          continue;
        }
        if (!isAdd && !alreadyAdmin) {
          message.reply(`⚠️ ${name} is not an admin.`);
          continue;
        }

        await api.changeAdminStatus(threadID, uid, isAdd);
        message.reply(
          isAdd
            ? `✅ ${name} has been promoted to Admin! 👑`
            : `❌ ${name} has been removed from admin. Back to noob zone 😶`
        );
      } catch (err) {
        console.error("❌ Error changing admin status:", err);
        message.reply(`❌ Couldn't change status for UID: ${uid}.`);
      }
    }
  }
};
