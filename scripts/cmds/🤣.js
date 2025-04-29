module.exports = {
 config: {
	 name: "😂",
	 version: "1.0",
	 author: "AceGun",
	 countDown: 5,
	 role: 0,
	 shortDescription: "no prefix",
	 longDescription: "no prefix",
	 category: "no prefix",
 },

 onStart: async function(){}, 
 onChat: async function({ event, message, getLang }) {
 if (event.body && event.body.toLowerCase() === "😂") {
 return message.reply({
 body: "     「ADMIN-ZIHAD」",
 attachment: await global.utils.getStreamFromURL("https://drive.google.com/uc?id=17DWud69hduKOoze_cnzaKu0L13EAfUrW")
 });
 }
 }
}
