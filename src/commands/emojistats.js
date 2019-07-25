const Mongo = require("../Mongo")

module.exports = {
	exec: function(msg, args) {
		Mongo.getGuild(msg.guild.id).then(doc => {
			let stats = Object.entries(doc.emojiStats).sort((a, b) => {return b[1]-a[1];});
			if (stats.length == 0)
				return msg.channel.send("no records yet");
			let ret = "";
			stats.forEach(i => {ret += `${Baka.client.emojis.get(i[0])} ${i[1]}\n`});
			msg.channel.send(ret || "");
		});
	}
}
