const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
config: {
  name: "owner",
  aurthor:"Tokodori",// Convert By Goatbot Tokodori 
   role: 0,
  shortDescription: " ",
  longDescription: "",
  category: "admin",
  guide: "{pn}"
},

  onStart: async function ({ api, event }) {
  try {
    const ownerInfo = {
      name: '𝗝𝗔𝗛𝗜𝗗𝗨𝗟 𝗜𝗦𝗟𝗔𝗠 𝗦𝗔𝗚𝗢𝗥',
      gender: '𝗠𝗔𝗟𝗘',
      whatsapp: '𝟬𝟭𝟯𝟭𝟰𝟰𝟵𝟵𝟬𝟳𝟵',
      address: '𝗥𝗔𝗡𝗚𝗣𝗨𝗥, 𝗣𝗔𝗡𝗖𝗛𝗢𝗚𝗔𝗥𝗛, 𝗗𝗘𝗕𝗜𝗚𝗢𝗡𝗝',
      facebookLink: 'https://www.facebook.com/profile.php?id=Xsagorxnxx',
      nick: '𝗦𝗔𝗚𝗢𝗥 𝗕𝗢𝗧'
    };

    const bold = 'https://i.imgur.com/yJbsOvH.jpeg'; // Replace with your Google Drive videoid link https://drive.google.com/uc?export=download&id=here put your video id

    const tmpFolderPath = path.join(__dirname, 'tmp');

    if (!fs.existsSync(tmpFolderPath)) {
      fs.mkdirSync(tmpFolderPath);
    }

    const videoResponse = await axios.get(bold, { responseType: 'arraybuffer' });
    const videoPath = path.join(tmpFolderPath, 'owner_pic.jpg');

    fs.writeFileSync(videoPath, Buffer.from(videoResponse.data, 'binary'));

    const response = `
𝗢𝗪𝗡𝗘𝗥 𝗜𝗡𝗙𝗢𝗥𝗠𝗔𝗡𝗧𝗜𝗢𝗡:🧾
𝗡𝗔𝗠𝗘: ${ownerInfo.name}
𝗚𝗘𝗡𝗗𝗘𝗥: ${ownerInfo.gender}
𝗪𝗛𝗔𝗧𝗦𝗔𝗣𝗣: ${ownerInfo.whatsapp}
𝗔𝗗𝗗𝗥𝗘𝗦𝗦: ${ownerInfo.address}
𝗙𝗔𝗖𝗘𝗕𝗢𝗢𝗞: ${ownerInfo.facebookLink}
𝗡𝗜𝗖𝗞𝗡𝗔𝗠𝗘: ${ownerInfo.nick}
`;


    await api.sendMessage({
      body: response,
      attachment: fs.createReadStream(videoPath)
    }, event.threadID, event.messageID);

    if (event.body.toLowerCase().includes('ownerinfo')) {
      api.setMessageReaction('🚀', event.messageID, (err) => {}, true);
    }
  } catch (error) {
    console.error('Error in ownerinfo command:', error);
    return api.sendMessage('An error occurred while processing the command.', event.threadID);
  }
},
};