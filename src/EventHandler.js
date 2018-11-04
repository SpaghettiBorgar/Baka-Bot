var MessageHandler = require("./MessageHandler");

Baka.client.on("message", msg => {
	if (msg.mentions.everyone) {
		msg.channel.send("<:mention:400370585584271362>");
		return;
	}
	if (msg.author.bot)
		return;
	MessageHandler.handle(msg);
});