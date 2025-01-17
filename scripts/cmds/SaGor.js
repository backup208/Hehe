module.exports = {
	config: {
			name: "SaGor",
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
	if (event.body && event.body.toLowerCase() == "sagor") return message.reply("এত সাগর সাগর করিস না পারলে তর ভবিষ্যতের বউটা সাগরকে দিস 😳");
}
};