const fs = require("fs");
const Discord = require("discord.js");
const images = {};

for (let file of fs.readdirSync("./media/images")) {
	images[file.split(".")[0]] = file;
}
module.exports = {
	exec: function (msg, args) {
		if (images[args[0]])
			msg.channel.send(new Discord.Attachment("./media/images/" + images[args[0]]));
		else {
			msg.channel.send("Available Pictures:\n`" + Object.keys(images).join("` `") + "`");
		}
	}
}