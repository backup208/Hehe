module.exports.config = {
  name: "rate",
  version: "1.0.0",
  role: 0,
  author: "Zihad",
  usePrefix: true,
  description: "Give a random funny rating to someone",
  category: "fun",
  guide: { en: "/rate [name]" },
  countDown: 1
};

module.exports.onStart = async function ({ api, event, args }) {
  const name = args.join(" ");
  if (!name) return api.sendMessage("কার রেটিং দিবো বলো? যেমন: /rate Rafi", event.threadID, event.messageID);

  const traits = [
    "সুন্দর",
    "বুদ্ধিমান",
    "পাগল",
    "ড্যাশিং",
    "গেমার",
    "ভাইরাল",
    "মাতাল",
    "প্রেমিক",
    "টকবাজ",
    "ক্রাশ",
    "বেকার"
  ];

  let msg = `📊 ${name} এর রেটিং:\n━━━━━━━━━━━━━━━\n`;
  for (let trait of traits) {
    const rate = Math.floor(Math.random() * 101); // 0-100%
    msg += `• ${trait}: ${rate}%\n`;
  }
  msg += `━━━━━━━━━━━━━━━\n𝗠𝗜𝗠-𝗕𝗢𝗧 🎀💋`;

  api.sendMessage(msg, event.threadID, event.messageID);
};