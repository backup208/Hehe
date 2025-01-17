const fs = require('fs');//please add music or video and move that all file inside scripts/cmdsnonprefix and replace that music name in the code or vdo if you want toset vdo just replace .mp3 with .mp4

module.exports = {
  config: {
    name: "xserg",
    version: "1.0",
    author: "AceGun",
    countDown: 5,
    role: 0,
    shortDescription: "no prefix",
    longDescription: "no prefix",
    category: "no prefix",
  },

  onStart: async function() {},

  onChat: async function({ event, message, getLang, api }) {
    if (event.body) {
      const word = event.body.toLowerCase();
      switch (word) {
        case "goodnight":
          message.reply({
            body: "∘₊✧─────────────────✧₊∘\n  Goodnight Everyone Sleepwell! 🌃",
            attachment: fs.createReadStream("scripts/cmds/noprefix/goodnight.gif"),
          });
          await api.setMessageReaction("🌃", event.messageID, event.threadID, api);
        break;
case "goodmorning":
          message.reply({
            body: "∘₊✧─────────────────✧₊∘\n          Goodmorning Everyone!\n                 Have A Nice Day 🌇",
            attachment: fs.createReadStream("scripts/cmds/noprefix/goodmorning.gif"),
          });
          await api.setMessageReaction("🌇", event.messageID, event.threadID, api);
   case "welcome 🌸":
          message.reply({
            body: "∘₊✧─────────────────✧₊∘\n    Welcome! Enjoy Your Stay! 🌸",
            attachment: fs.createReadStream("scripts/cmds/noprefix/welcome.gif"),
          });
          await api.setMessageReaction("🌸", event.messageID, event.threadID, api);
case "prefix2":
          message.reply({
            body: "Hello, My Lord My Prefix Is ».  «",
            attachment: fs.createReadStream("scripts/cmds/noprefix/garou.gif"),
          });
          await api.setMessageReaction("🪐", event.messageID, event.threadID, api);
  case "owner":
message.reply({
body: "———»𝗔𝗗𝗠𝗜𝗡 𝗕𝗢𝗧«———\n❯ 𝗕𝗼𝘁-𝗡𝗮𝗺𝗲: 𝗦𝗮𝗚𝗼𝗿-𝗕𝗼𝘁\n❯ 𝗕𝗼𝘁 𝗢𝘄𝗻𝗲𝗿: 𝗝𝗔𝗛𝗜𝗗𝗨𝗟 𝗜𝗦𝗟𝗔𝗠 𝗦𝗔𝗚𝗢𝗥\n❯ 𝗔𝗴𝗲: 16 \n❯ 𝗚𝗲𝗻𝗱𝗲𝗿: Male\n❯ 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸: https://www.facebook.com/profile.php?id=Xsagorxnxx\n❯ 𝗧𝗼𝘁𝗮𝗹 𝗴𝗿𝗼𝘂𝗽: 12\n❯ 𝗧𝗼𝘁𝗮𝗹 𝘂𝘀𝗲𝗿𝘀: 862\n❯ 𝗕𝗼𝘁 𝗽𝗿𝗲𝗳𝗶𝘅: #\n❯ 𝗪𝗵𝗮𝘁𝘀 𝗮𝗽𝗽: 01314499079\n❯ 𝗧𝗵𝗮𝗻𝗸𝘀 𝗳𝗼𝗿 𝘂𝘀𝗶𝗻𝗴 𝗺𝘆 𝗦𝗮𝗚𝗼𝗿-𝗕𝗼𝘁",
            attachment: fs.createReadStream("scripts/cmds/noprefix/goodnight.gif"),
          });
          await api.setMessageReaction("😙", event.messageID, event.threadID, api);
   default:
          return;
      }
    }
  }
};
