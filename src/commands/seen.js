const MemberParser = require("../MemberParser");
const Mongo = require("../Mongo");
const moment = require("moment");

module.exports = {
	exec: function(msg, args) {
		if (!args[0])
			return msg.channel.send("Specify a user");
		let user = MemberParser.user(args[0], msg.guild);
		if (!user)
			return msg.channel.send("There is no such user");
		Mongo.getUser(user.id).then(doc => {
			msg.channel.send({ embed: {
				color: Baka.config.embedColor,
				timestamp: new Date(),
				author: {
					name: user.tag,
					icon_url: user.avatarURL
				},
				thumbnail: {
					url: user.avatarURL
				},
				fields: [
					{
						name: `${user.presence.status} since`,
						value: doc.since ? moment(doc.since).fromNow() : "no record"
					},
					{
						name: "last message",
						value: doc.lastmessage ? moment(doc.lastmessage).fromNow() : "no record"
					}
				],
				footer: {
					icon_url: msg.author.avatarURL,
					text: msg.author.tag
				}
			}});
		});
	}
}