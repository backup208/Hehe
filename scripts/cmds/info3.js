const { getStreamFromURL } = global.utils;
const moment = require("moment-timezone");

module.exports = {
  config: {
    name: "asifinfo",
    version: "1.1",
    author: "Mahi--",
    countDown: 0,
    role: 0,
    shortDescription: "Owner Info with image",
    longDescription: "Displays owner info with fixed FB image",
    category: "owner",
    guide: {
      en: "{pn}"
    }
  },

  onStart: async function ({ message, event, api }) {
    const imgURL = "https://graph.facebook.com/61558166309783/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662";
    
    try {
      const stream = await getStreamFromURL(imgURL);
      const threadInfo = await api.getThreadInfo(event.threadID);
      const threadName = threadInfo.threadName || "Unknown Group";
      const time = moment().tz("Asia/Dhaka").format("hh:mm A, dddd");

      const caption = `
╭────────────────⊙
│ ♥︎𝖠𝖲𝖲𝖠𝖫𝖠𝖬𝖴 𝖶𝖫𝖠𝖨𝖪𝖴𝖬♥︎              
├────────────────❖
├──❯   ♡︎_𝙰𝙳𝙼𝙸𝙽 𝙸𝙽𝙵𝙾_♡︎            
├‣𝙽𝙰𝙼𝙴 : Asif ( আসিফ )                  
├‣𝙱𝙰𝚂𝙰 : Gazipur, Mawna                  
├‣𝚂𝚃𝙳𝚈 : ʜsᴄ (ᶜᵃⁿᵈⁱᵈᵃᵗᵉ)                
├──❯     ♡︎_𝙲𝙾𝙽𝚃𝙰𝙲𝚃_♡︎               
├‣𝙵𝙱 : Samiun Evan Asif (maru hubby)                  
├‣𝚃𝚃 : hey_its_me_asif                  
├──❯ ♡︎_𝚁𝙴𝙻𝙰𝚃𝙸𝙾𝙽 𝚂𝙷𝙸𝙿_♡︎                
├‣𝚂𝚃𝙰𝚃𝚄𝚂 : Mingle_☺︎︎  
├‣𝙲𝚁𝚄𝚂𝙷   : ✓ (maru)
├──❯   ♡︎_𝙶𝙲 𝙸𝙽𝙵𝙾_♡︎
├‣𝙶𝙲 𝙽𝙰𝙼𝙴 : ${threadName}
├‣⏳ 𝚃𝙸𝙼𝙴 : ${time}  
├‣𝙿𝚁𝙴𝙵𝙸𝚇  : ( ' )
├────────────────❖
│ ❀𝐓𝐇𝐀𝐍𝐊𝐒 𝐅𝐎𝐑 𝐔𝐒𝐈𝐍𝐆❀
㋛︎───────────㋛︎`;

      message.reply({ body: caption, attachment: stream });
    } catch (e) {
      console.error(e);
      message.reply("Failed to load image or info.");
    }
  }
};
