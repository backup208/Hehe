module.exports = {
  config: {
    name: "setemoji",
    version: "1.0",
    author: "_ANIK 🐢",
    role: 1, // শুধুমাত্র গ্রুপ অ্যাডমিন বা বট অ্যাডমিন
    countDown: 5,
    shortDescription: "গ্রুপের ইমোজি পরিবর্তন করুন",
    category: "group",
    guide: "{pn} 😊"
  },

  onStart: async function({ api, event, args }) {
    const emoji = args[0];

    if (!emoji) {
      return api.sendMessage("👉 একটি ইমোজি দিন!\nউদাহরণ: /setemoji 😎", event.threadID, event.messageID);
    }

    try {
      await api.changeThreadEmoji(emoji, event.threadID);
      return api.sendMessage(`✅ গ্রুপের ইমোজি পরিবর্তন করা হয়েছে: ${emoji}`, event.threadID, event.messageID);
    } catch (err) {
      console.error(err);
      return api.sendMessage("❌ ইমোজি পরিবর্তন করতে ব্যর্থ! সম্ভবত এই ইমোজি সাপোর্ট করে না।", event.threadID, event.messageID);
    }
  }
};
