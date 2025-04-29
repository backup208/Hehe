module.exports = {
  config: {
    name: "cate",
    version: "1.0",
    author: "Zihad Edit by ChatGPT",
    countDown: 3,
    role: 0,
    shortDescription: { en: "View commands by category" },
    longDescription: { en: "Use /cat [category] to see commands in that category" },
    category: "info",
    guide: { en: "{pn} [category name]" }
  },

  onStart: async function ({ message, args, role }) {
    const { commands } = global.GoatBot;
    const categories = {};

    for (const [name, command] of commands) {
      if (command.config.role > role) continue;
      const category = command.config.category || "uncategorized";
      if (!categories[category]) categories[category] = [];
      categories[category].push(name);
    }

    if (!args[0]) {
      let msg = "📁 𝗔𝗩𝗔𝗜𝗟𝗔𝗕𝗟𝗘 𝗖𝗔𝗧𝗘𝗚𝗢𝗥𝗜𝗘𝗦:\n\n";
      for (const cat in categories) {
        msg += `◈ ${cat.toUpperCase()} (${categories[cat].length})\n`;
      }
      msg += `\n➡️ Use "/cat [category]" to see commands in that category.`;
      return message.reply(msg);
    }

    const inputCategory = args.join(" ").toLowerCase();
    const foundCategory = Object.keys(categories).find(
      cat => cat.toLowerCase() === inputCategory
    );

    if (!foundCategory) {
      return message.reply(`❌ | Category "${inputCategory}" not found.`);
    }

    const cmds = categories[foundCategory];
    let list = `📂 Category: ${foundCategory.toUpperCase()}\nTotal Commands: ${cmds.length}\n\n`;

    list += cmds.map(cmd => `◈ ${cmd}`).join("\n");
    return message.reply(list);
  }
};
