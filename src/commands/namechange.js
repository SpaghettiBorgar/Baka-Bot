const wordlists = require("../Wordlists.js");

module.exports = {
	exec: (msg, args) => {
		let list = args[0] ? args[0] : "german";
		let name = wordlists.random(list);
		if (name) {
			msg.member.setNickname(name)
			.then(()=>msg.channel.send("hi, " + name))
			.catch(()=>msg.channel.send("you're too powerful"));
		} else {
			msg.channel.send("Available: " + wordlists.list());
		}
	}
}