module.exports = {
  config: {
    name: "autoreact",
    version: "2.1",
    author: "Loid Butter & Modified by Zihad",
    countDown: 0,
    role: 0,
    shortDescription: "Auto emoji react",
    longDescription: "React with same emoji as message contains or predefined words",
    category: "fun",
  },

  onStart: async function () {},

  onChat: async function ({ event, api }) {
    const message = event.body;
    const allowedEmojis = [
      "😀", "🙂", "🙃", "🫠", "😉", "😊", "🥰", "😍", "🤩", "☺️", "😗", "😋", "😝", "😜", "😑",
      "😷", "🫥", "🥵", "🤮", "😪", "😐", "😏", "☹️", "😕", "😲", "🥺", "🤗", "🤪", "🙁", "🫤",
      "😯", "🥹", "😞", "👻", "🤖", "😼", "💀", "👽", "😺", "😹", "❤️", "💝", "🐒", "🐈‍⬛", "🐅",
      "🐖", "🐮", "🐃", "🐸"
    ];

    const foundEmoji = allowedEmojis.find(emoji => message.includes(emoji));
    if (foundEmoji) {
      return api.setMessageReaction(foundEmoji, event.messageID, event.threadID);
    }

    const lower = message.toLowerCase();
    const reacts = [
      { keyword: "iloveyou", react: "😙" },
      { keyword: "good night", react: "💗" },
      { keyword: "good morning", react: "💗" },
      { keyword: "pakyo", react: "😠" },
      { keyword: "mahal", react: "💗" },
      { keyword: "mwa", react: "💗" },
      { keyword: "😢", react: "😢" },
      { keyword: "😆", react: "😆" },
      { keyword: "😂", react: "😆" },
      { keyword: "🤣", react: "😆" },
      { keyword: "tangina", react: "😡" },
      { keyword: "good afternoon", react: "❤" },
      { keyword: "good evening", react: "❤" },
      { keyword: "gago", react: "😡" },
      { keyword: "bastos", react: "😳" },
      { keyword: "bas2s", react: "😳" },
      { keyword: "bastog", react: "😳" },
      { keyword: "hi", react: "💗" },
      { keyword: "hello", react: "💗" },
      { keyword: "zope", react: "⏳" },
      { keyword: "pangit", react: "😠" },
      { keyword: "redroom", react: "😏" },
      { keyword: "pakyu", react: "🤬" },
      { keyword: "fuck you", react: "🤬" },
      { keyword: "bata", react: "👧" },
      { keyword: "kid", react: "👧" },
      { keyword: "i hate you", react: "😞" },
      { keyword: "useless", react: "😓" },
      { keyword: "omg", react: "😮" },
      { keyword: "shoti", react: "😏" },
      { keyword: "pogi", react: "😎" },
      { keyword: "ganda", react: "💗" },
      { keyword: "i miss you", react: "💗" },
      { keyword: "sad", react: "😔" }
    ];

    for (const { keyword, react } of reacts) {
      if (lower.includes(keyword)) {
        return api.setMessageReaction(react, event.messageID, event.threadID);
      }
    }
  }
};module.exports = {
  config: {
    name: "autoreact",
    version: "2.1",
    author: "Loid Butter & Modified by Zihad",
    countDown: 0,
    role: 0,
    shortDescription: "Auto emoji react",
    longDescription: "React with same emoji as message contains or predefined words",
    category: "fun",
  },

  onStart: async function () {},

  onChat: async function ({ event, api }) {
    const message = event.body;
    const allowedEmojis = [
      "😀", "🙂", "🙃", "🫠", "😉", "😊", "🥰", "😍", "🤩", "☺️", "😗", "😋", "😝", "😜", "😑",
      "😷", "🫥", "🥵", "🤮", "😪", "😐", "😏", "☹️", "😕", "😲", "🥺", "🤗", "🤪", "🙁", "🫤",
      "😯", "🥹", "😞", "👻", "🤖", "😼", "💀", "👽", "😺", "😹", "❤️", "💝", "🐒", "🐈‍⬛", "🐅",
      "🐖", "🐮", "🐃", "🐸", "👀"
    ];

    const foundEmoji = allowedEmojis.find(emoji => message.includes(emoji));
    if (foundEmoji) {
      return api.setMessageReaction(foundEmoji, event.messageID, event.threadID);
    }

    const lower = message.toLowerCase();
    const reacts = [
      { keyword: "iloveyou", react: "😙" },
      { keyword: "good night", react: "💗" },
      { keyword: "good morning", react: "💗" },
      { keyword: "pakyo", react: "😠" },
      { keyword: "mahal", react: "💗" },
      { keyword: "mwa", react: "💗" },
      { keyword: "😢", react: "😢" },
      { keyword: "😆", react: "😆" },
      { keyword: "😂", react: "😆" },
      { keyword: "🤣", react: "😆" },
      { keyword: "tangina", react: "😡" },
      { keyword: "good afternoon", react: "❤" },
      { keyword: "good evening", react: "❤" },
      { keyword: "gago", react: "😡" },
      { keyword: "bastos", react: "😳" },
      { keyword: "bas2s", react: "😳" },
      { keyword: "bastog", react: "😳" },
      { keyword: "hi", react: "💗" },
      { keyword: "hello", react: "💗" },
      { keyword: "zope", react: "⏳" },
      { keyword: "pangit", react: "😠" },
      { keyword: "redroom", react: "😏" },
      { keyword: "pakyu", react: "🤬" },
      { keyword: "fuck you", react: "🤬" },
      { keyword: "bata", react: "👧" },
      { keyword: "kid", react: "👧" },
      { keyword: "i hate you", react: "😞" },
      { keyword: "useless", react: "😓" },
      { keyword: "omg", react: "😮" },
      { keyword: "shoti", react: "😏" },
      { keyword: "pogi", react: "😎" },
      { keyword: "ganda", react: "💗" },
      { keyword: "i miss you", react: "💗" },
      { keyword: "sad", react: "😔" }
    ];

    for (const { keyword, react } of reacts) {
      if (lower.includes(keyword)) {
        return api.setMessageReaction(react, event.messageID, event.threadID);
      }
    }
  }
};
