module.exports = {
	config: {
			name: "swoya",
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
	if (event.body && event.body.toLowerCase() == "swoya") return message.reply("বাঙালি একটা ওরজিনাল বোকাচোদা নুনু থাকা সত্ত্বেও আবার সাওয়া চায় 🥵");
}
};