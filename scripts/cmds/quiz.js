const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');

const dataFilePath = path.join(__dirname, 'quizData.json');

let quizData = {};
if (fs.existsSync(dataFilePath)) {
  quizData = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
}

function saveData() {
  fs.writeFileSync(dataFilePath, JSON.stringify(quizData, null, 2));
}

module.exports = {
  config: {
    name: "quiz",
    aliases: ["trivia"],
    version: "1.2",
    author: "UPoL 🐔",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "Play a random quiz"
    },
    longDescription: {
      en: "Play a random quiz game and earn rewards for correct answers."
    },
    category: "game",
    guide: {
      en: "{pn} [category | list | leaderboard | rank]\nUse without category to get a random quiz\nUse 'list' to view available categories\nUse 'leaderboard' to see top players\nUse 'rank' to see your stats"
    },
  },

  onReply: async function ({ args, event, api, Reply, usersData }) {
    const { questionData, correctAnswer, nameUser, category } = Reply;
    if (event.senderID !== Reply.author) return;

    const userReply = event.body.trim().toUpperCase();
    if (!["A", "B", "C", "D"].includes(userReply)) {
      return api.sendMessage("❗ Please reply with one of: A, B, C, or D.", event.threadID);
    }

    const senderID = event.senderID;
    if (!quizData[senderID]) {
      quizData[senderID] = {
        name: nameUser,
        wins: 0,
        losses: 0,
        categories: {}
      };
    }

    const userStats = quizData[senderID];

    if (userReply === correctAnswer.toUpperCase()) {
      api.unsendMessage(Reply.messageID).catch(console.error);

      const rewardCoins = Math.floor(Math.random() * (1000 - 500 + 1)) + 500;
      const rewardExp = Math.floor(Math.random() * (10 - 5 + 1)) + 5;

      const userData = await usersData.get(senderID);
      await usersData.set(senderID, {
        money: userData.money + rewardCoins,
        exp: userData.exp + rewardExp,
        data: userData.data
      });

      userStats.wins += 1;
      userStats.categories[category] = (userStats.categories[category] || 0) + 1;
      saveData();

      return api.sendMessage(
        `✅ ${nameUser}, you answered correctly!\nAnswer: ${correctAnswer}\n\nYou've earned:\n- 💰 ${rewardCoins} coins\n- ✨ ${rewardExp} EXP`,
        event.threadID, event.messageID
      );
    } else {
      api.unsendMessage(Reply.messageID).catch(console.error);

      userStats.losses += 1;
      saveData();

      return api.sendMessage(`${nameUser}, that’s incorrect!\nCorrect answer: ${correctAnswer}`, event.threadID);
    }
  },

  onStart: async function ({ api, event, args, usersData }) {
    const { threadID, messageID } = event;
    const senderID = event.senderID;
    const nameUser = await usersData.getName(senderID);

    if (args[0]?.toLowerCase() === "list") {
      try {
        const response = await axios.get('https://upol-quiz-game.onrender.com/categories');
        const categories = response.data.categories;

        const listMsg = `Quiz Categories:\n\n` +
          categories.map((cat, i) => `• ${i + 1}. ${cat.charAt(0).toUpperCase() + cat.slice(1)}`).join("\n") +
          `\n\nUse: quiz <category>`;
        return api.sendMessage(listMsg, threadID, messageID);
      } catch (err) {
        console.error("Error fetching categories:", err);
        return api.sendMessage("❌ Failed to fetch categories. Please try again later.", threadID, messageID);
      }
    }

    if (args[0]?.toLowerCase() === 'leaderboard') {
      const topUsers = Object.entries(quizData)
        .map(([id, stats]) => ({
          id,
          name: stats.name,
          wins: stats.wins,
          losses: stats.losses
        }))
        .sort((a, b) => b.wins - a.wins)
        .slice(0, 10);

      const leaderboardMessage = topUsers
        .map((user, index) => `${index + 1}. ${user.name} - Wins: ${user.wins}, Losses: ${user.losses}`)
        .join('\n');

      return api.sendMessage(`🏆 Top Players:\n\n${leaderboardMessage}`, threadID, messageID);
    }

    if (args[0]?.toLowerCase() === 'rank') {
      const stats = quizData[senderID];
      if (!stats) {
        return api.sendMessage("No data available for your rank.", threadID, messageID);
      }

      const width = 800;
      const height = 400;
      const canvas = createCanvas(width, height);
      const ctx = canvas.getContext('2d');

      try {
        const background = await loadImage('https://i.imgur.com/MJAkxbh.png');
        ctx.drawImage(background, 0, 0, width, height);
      } catch (err) {
        console.error("Error loading background image:", err);
        ctx.fillStyle = '#2c3e50';
        ctx.fillRect(0, 0, width, height);
      }

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 30px Arial';
      ctx.fillText(`Name: ${stats.name}`, 50, 50);
      ctx.fillText(`Wins: ${stats.wins}`, 50, 100);
