const FuseJS = require("fuse.js");

const mentionRegex = /(?<!\\)(?<=<@!?)\d{17,18}(?=>)/;
const idRegex = /\d{17,18}/;

exports.user = function(name, guild) {
	match = name.match(mentionRegex);
	if (match) {
		return Baka.client.users.get(match[0]);
	} else if (name.match(idRegex)) {
		return Baka.client.users.get(name);
	} else {
		let fuse = new FuseJS(guild.members.array(), {
			id: "user",
			shouldSort: true,
			threshold: 0.6,
			keys: ["displayName", "user.username"]
		});
		let res = fuse.search(name);
		if (res)
			return res[0];
	}
}

exports.member = function(name, guild) {
	match = name.match(mentionRegex);
	if (match) {
		return guild.members.get(match[0]);
	} else if (name.match(idRegex)) {
		return guild.members.get(name);
	} else {
		let fuse = new FuseJS(guild.members.array(), {
			shouldSort: true,
			threshold: 0.6,
			keys: ["displayName", "user.username"]
		});
		let res = fuse.search(name);
		if (res)
			return res[0];
	}
}