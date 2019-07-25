const wordlists = require("../Wordlists.js");

module.exports = {
	exec: (msg, args) => {
		let list = args[0] ? args[0] : "german";
		if (!wordlists.words[list])
			return msg.channel.send("Available: " + wordlists.list());
		let word;
		if (args[1]) {
			if (isNaN(args[1])) {
				word = wordlists.find(list, args[1]);
				if (word == 0)
					return msg.channel.send("Word not found");
			} else {
				if (args[2]) 
					word = wordlists.range(list, args[1], args[2]);
				else 
					word = wordlists.get(list, args[1]);
				if (!word)
					return msg.channel.send("Invalid Index");
			}
		} else {
			word = wordlists.random(list);
		}
		msg.channel.send(word);
	}
}