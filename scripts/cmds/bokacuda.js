module.exports = {
	config: {
			name: "bokaxuda",
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
	if (event.body && event.body.toLowerCase() == "bokaxuda") return message.reply("খানকির পোলা কারে বোকাচোদা বলিস কথা ভবে চিন্তা বলিস 😡");
}
};