const fs = require('fs-extra');
const path = require('path');
const seenFile = path.join(__dirname, 'cache', 'autoseen.txt');
const reactFile = path.join(__dirname, 'cache', 'autoreact.txt');

const reactions = [
  // Faces
  "😃","😄","😁","😆","😅","🤣","😭","😓","🥰","😇","😜","😞","😛",
  "🫢","😒","😶","🤢","🥵","🤓","😵‍💫","😎","🤠","😵","😪","😬","🥹",
  "😩","😓","😈","👿","😫","😡","😤","😦","😫",

  // Cats / Animals
  "😺","😼","🙀","😾","🙈","🙉","🙊","🐱","🦖","🐸","🐢","🦄","🐷","🐍","🐙","🦉","🐧","🐥","🦋",

  // Extras
  "😮‍💨","🫨","🫠","🫣","🤯","🥴","🤧","🤕","🤒","😷","💩","👽","👾","👁️‍🗨️",

  // Body & Action
  "💋","👀","🫦","🙋‍♂️","🤦‍♀️","🤦‍♂️","🤷‍♀️","🧍‍♂️","🧎‍♀️","🫶","💅","👣",

  // Professions
  "👨‍⚕️","👨‍🏫","🧙‍♂️","🧛‍♀️","🧟‍♂️","🧌","🦹‍♀️","🦸‍♂️",

  // Magic & Fun
  "🔮","🧿","🪄","🪩","🪅","🪁","🎭","🎪","🧸","🎉","🧨",

  // Vehicles
  "🚥","🚦","🛑","🚧","⚓","✈️","⛵","🚤","🚀","🛸","🛵","🚓","🛳️","🚁",

  // Space / Nature
  "🌚","🌝","🪐","🌟","🌠","☄️","🌪️","🌀","🌈","🔥","💫",

  // Misc
  "👓","🧳","🎧","📦","🐸","📯","🧻","🪠","🧽","🪞","🛐"
];

module.exports = {
  config: {
    name: "a",
    version: "2.0.0",
    hasPermssion: 2,
    author: "Zihad",
    shortDescription: {
      en: "Toggle auto seen and auto react"
    },
    longDescription: {
      en: "Enable or disable automatic seen and reaction for new messages."
    },
    category: "admin",
    guide: {
      en: "[seen on/off] | [react on/off]"
    },
    cooldowns: 5
  },

  onChat: async ({ api, event }) => {
    // AutoSeen
    if (fs.existsSync(seenFile) && fs.readFileSync(seenFile, 'utf-8') === 'true') {
      api.markAsReadAll(() => {});
    }

    // AutoReact
    if (fs.existsSync(reactFile) && fs.readFileSync(reactFile, 'utf-8') === 'true') {
      const random = reactions[Math.floor(Math.random() * reactions.length)];
      try {
        await api.setMessageReaction(random, event.messageID, null, true);
      } catch (err) {
        console.log("AutoReact Error:", err);
      }
    }
  },

  onStart: async ({ api, event, args }) => {
    try {
      const option = args[0];
      const value = args[1];

      if (option === 'seen') {
        if (value === 'on') {
          fs.writeFileSync(seenFile, 'true');
          return api.sendMessage('✅ AutoSeen is now ON.', event.threadID, event.messageID);
        } else if (value === 'off') {
          fs.writeFileSync(seenFile, 'false');
          return api.sendMessage('❌ AutoSeen is now OFF.', event.threadID, event.messageID);
        } else {
          return api.sendMessage('⚠️ Usage: auto seen on/off', event.threadID, event.messageID);
        }
      }

      if (option === 'react') {
        if (value === 'on') {
          fs.writeFileSync(reactFile, 'true');
          return api.sendMessage('✅ AutoReact is now ON.', event.threadID, event.messageID);
        } else if (value === 'off') {
          fs.writeFileSync(reactFile, 'false');
          return api.sendMessage('❌ AutoReact is now OFF.', event.threadID, event.messageID);
        } else {
          return api.sendMessage('⚠️ Usage: auto react on/off', event.threadID, event.messageID);
        }
      }

      // Invalid usage
      return api.sendMessage('⚠️ Invalid usage.\nUse:\n- autoseen seen on/off\n- autoseen react on/off', event.threadID, event.messageID);

    } catch (e) {
      console.error(e);
      api.sendMessage('❌ Something went wrong while executing autoseen command.', event.threadID, event.messageID);
    }
  }
};
