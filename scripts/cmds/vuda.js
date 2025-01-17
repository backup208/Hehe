module.exports = {
	config: {
			name: "vuda",
			version: "1.0",
			author: "Jaychris Garcia",
			countDown: 5,
			role: 0,
			shortDescription: "No Prefix",
			longDescription: "No Prefix",
			category: "reply",
	},
onStart: async function(){}, 
onChat: async function({
	event,
	message,
	getLang
}) {
	if (event.body && event.body.toLowerCase() == "vuda") return message.reply("তর তো নুনু আছে আবার ভোদা চাস কেন । আমি কালকে স্বপ্নে দেখছি তর ভোদা গজাইছে 😇");
}
};