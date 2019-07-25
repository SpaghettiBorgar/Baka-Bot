const Mongo = require("./Mongo");

const emojiRegex = /(?<!\\)<a?:\w{2,32}:\d{18}>/g;
const emojiIDRegex = /(?<!\\)(?<=<a?:\w{2,32}:)\d{18}(?=>)/g;

exports.processMessage = function(msg) {
	let emojis = msg.content.match(emojiIDRegex);
	if (!emojis)
		return;
	Mongo.getGuild(msg.guild.id).then(res => {
		let stats = res.emojiStats;
		for(emojiID of emojis) {
			let emoji = Baka.client.emojis.get(emojiID);
			if (emoji && !emoji.deleted && !emoji.managed && emoji.guild.id == msg.guild.id) {
				if (!stats[emojiID])
					stats[emojiID] = 0;
				stats[emojiID]++;
			}
		}
		Mongo.updateGuild(msg.guild.id, {$set: {emojiStats: stats}});
	});
}
