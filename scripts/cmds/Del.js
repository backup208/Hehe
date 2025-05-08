module.exports = {
  config: {
    name: "delete",
    aliases: ["del"],
    author: "S",
role: 2,
    category: "system"
  },

  onStart: async function ({ api, event, args }) {
    const fs = require('fs');
    const path = require('path');

    const fileName = args[0];

    if (!fileName) {
      api.sendMessage("Please provide a file name to delete.", event.threadID);
      return;
    }

    const filePath = path.join(__dirname, fileName);

    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(err);
        api.sendMessage(`❎ | Failed to delete ${fileName}.`, event.threadID);
        return;
      }
      api.sendMessage(`✅ 𝚃𝙷𝙴 𝙲𝙼𝙳 𝙷𝙰𝚂 𝙱𝙴𝙴𝙽 𝙳𝙴𝙻𝙴𝚃𝙴𝚂 ➪ ( ${fileName} ) 𝚂𝚄𝙲𝙲𝙴𝚂𝚂𝙵𝚄𝙻𝙻𝚈!`, event.threadID);
    });
  }
};
