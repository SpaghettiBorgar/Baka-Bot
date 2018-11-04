const n1 = "<:neko1:416336103788904448>\n";
const n2 = "<:neko2:416336103247708170>\n";
const n3 = "<:neko3:416336103738572806>\n";

module.exports = {
	exec: function (msg, args) {
		let len = args[0] ? Math.round(parseFloat(args[0])) : 1;
		if (len == null || isNaN(len) || len > 60 || len < 0)
			return msg.channel.send("Invalid length!");
		let text = n1;
		text += n2.repeat(len);
		text += n3;
		msg.channel.send(text)
	}
}