module.exports = {
	config: {
			name: "mang",
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
	if (event.body && event.body.toLowerCase() == "মাং") return message.reply("এত মাং মাং করিস না তর নুনু কেটে মাং লাগাই দিমু 🌚");
}
};