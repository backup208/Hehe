module.exports = {
	config: {
			name: "bal",
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
	if (event.body && event.body.toLowerCase() == "Bal") return message.reply("তর কত বড় বড় বাল আছে । খালি বাল বাল করিস বড় বাল থাকলে বাজারে বিক্রি করিস বোকাচোদা 🫣");
}
};