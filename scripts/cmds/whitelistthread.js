const { config } = global.GoatBot;
const { writeFileSync } = require("fs-extra");

module.exports = {
	config: {
		name: "whitelistthread",
		aliases: ["wlt"],
		version: "1.5",
		author: "NTKhang + Modified by Mim",
		countDown: 5,
		role: 0,
		longDescription: {
			en: "Add, remove, edit whiteListThreadIds role"
		},
		category: "owner",
		guide: {
			en: '   {pn} [add | -a]: Add current thread to whitelist'
				+ '\n   {pn} [remove | -r]: Remove current thread from whitelist'
				+ '\n   {pn} [add | -a] <tid>: Add specific thread'
				+ '\n   {pn} [remove | -r] <tid>: Remove specific thread'
				+ '\n   {pn} [list | -l]: List all whitelisted threads'
		}
	},

	langs: {
		en: {
			added: "✅ | Added whiteListThreadIds role for %1 thread:\n%2",
			alreadyAdmin: "\n⚠️ | %1 thread already have whiteListThreadIds role:\n%2",
			missingIdAdd: "⚠️ | Please enter TID to add whiteListThreadIds role",
			removed: "✅ | Removed whiteListThreadIds role of %1 thread:\n%2",
			notAdmin: "⚠️ | %1 users don't have whiteListIds role:\n%2",
			missingIdRemove: "⚠️ | Please enter TID to remove whiteListThreadIds role",
			listAdmin: "👑 | List of whiteListThreadIds:\n%1"
		}
	},

	onStart: async function ({ message, args, usersData, event, getLang }) {
		switch (args[0]) {
			case "add":
			case "-a":
			case "+": {
				const uids = args[1] ? args.filter(arg => !isNaN(arg)) : [event.threadID];
				const alreadyInList = [], addedNow = [];

				for (const uid of uids) {
					if (config.whiteListModeThread.whiteListThreadIds.includes(uid))
						alreadyInList.push(uid);
					else {
						config.whiteListModeThread.whiteListThreadIds.push(uid);
						addedNow.push(uid);
					}
				}

				writeFileSync(global.client.dirConfig, JSON.stringify(config, null, 2));
				const getNames = await Promise.all(uids.map(uid => usersData.getName(uid).then(name => ({ uid, name }))));

				return message.reply(
					(addedNow.length > 0 ? getLang("added", addedNow.length, getNames.filter(i => addedNow.includes(i.uid)).map(({ uid, name }) => `• ${name} (${uid})`).join("\n")) : "")
					+ (alreadyInList.length > 0 ? getLang("alreadyAdmin", alreadyInList.length, alreadyInList.map(uid => `• ${uid}`).join("\n")) : "")
				);
			}

			case "remove":
			case "-r":
			case "-": {
				const uids = args[1] ? args.filter(arg => !isNaN(arg)) : [event.threadID];
				const notInList = [], removedNow = [];

				for (const uid of uids) {
					if (config.whiteListModeThread.whiteListThreadIds.includes(uid)) {
						config.whiteListModeThread.whiteListThreadIds.splice(config.whiteListModeThread.whiteListThreadIds.indexOf(uid), 1);
						removedNow.push(uid);
					} else {
						notInList.push(uid);
					}
				}

				writeFileSync(global.client.dirConfig, JSON.stringify(config, null, 2));
				const getNames = await Promise.all(removedNow.map(uid => usersData.getName(uid).then(name => ({ uid, name }))));

				return message.reply(
					(removedNow.length > 0 ? getLang("removed", removedNow.length, getNames.map(({ uid, name }) => `• ${name} (${uid})`).join("\n")) : "")
					+ (notInList.length > 0 ? getLang("notAdmin", notInList.length, notInList.map(uid => `• ${uid}`).join("\n")) : "")
				);
			}

			case "list":
			case "-l": {
				const getNames = await Promise.all(config.whiteListModeThread.whiteListThreadIds.map(uid => usersData.getName(uid).then(name => ({ uid, name }))));
				return message.reply(getLang("listAdmin", getNames.map(({ uid, name }) => `• ${name} (${uid})`).join("\n")));
			}

			default:
				return message.SyntaxError();
		}
	}
};
