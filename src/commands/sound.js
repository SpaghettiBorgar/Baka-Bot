const fs = require("fs");
const Discord = require("discord.js");
const sounds = {};

for (let file of fs.readdirSync("./media/sounds")) {
	sounds[file.split(".")[0]] = file;
}

module.exports = {
	exec: function (msg, args) {
		if (sounds[args[0]]) {
			let channel = msg.member.voiceChannel;
			if (!channel) {
				msg.channel.send("You need to be in a voice channel.");
			} else {
				channel.join().then(connection => {
					connection.playFile("./media/sounds/" + sounds[args[0]])
					.on("end", () => { connection.disconnect() });
				});
			}
		} else {
			msg.channel.send("Available Sounds:\n`" + Object.keys(sounds).join("` `") + "`");
		}
	}
}