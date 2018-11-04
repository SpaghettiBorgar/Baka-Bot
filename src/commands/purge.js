const Discord = require("discord.js");

module.exports = {
	exec: function (msg, args) {
		if (!msg.member.permissions.has(Discord.Permissions.FLAGS.MANAGE_MESSAGES))
			return msg.channel.send("u no rights");
		let amount = Math.round(parseFloat(args[0]));
		if (amount == null || amount > 99 || isNaN(amount))
			return msg.channel.send("must be between 1 and 100");

		msg.channel.bulkDelete(amount + 1).then(() => {
			msg.channel.send(":ok_hand:").then(message => {
				setTimeout(function () {
					message.delete();
				}, 5000);
			});
		});
	}
}