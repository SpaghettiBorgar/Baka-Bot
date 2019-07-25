const wordlists = require("../Wordlists.js");

module.exports = {
	exec: (msg, args) => {
		let list = args[0] ? args[0] : "german";
		let amount = args[1] ? args[1] : msg.guild.members.size;
		let names = [];
		if (wordlists.words[list]) {
			for (let i = 0 ;i < amount; i++)
				names.push(wordlists.random(list));
			msg.channel.send('`' + names.join('|') + '`');
		} else {
			msg.channel.send("Available: " + wordlists.list());
		}
	}
}
