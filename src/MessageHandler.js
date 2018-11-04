const tableflip = "(╯°□°）╯︵ ┻━┻";
const unflip = "┬─┬ ノ( ゜-゜ノ)";

exports.handle = function (msg) {

	if (msg.content == tableflip)
		Baka.tableflip = msg.author.toString();
	else if (msg.content == unflip)
		Baka.tableflip = null;

	if (!msg.content.startsWith(Baka.config.prefix))
		return;
	let cmd = msg.content.split(" ")[0].substr(Baka.config.prefix.length);
	let args = msg.content.split(" ").splice(1);

	if (Baka.commands.hasOwnProperty(cmd)) {
		Baka.log((msg.channel.type == "text" ? `${msg.guild.name}#${msg.channel.name}` : ``) + `@${msg.author.username}: ${msg.content}`);
		Baka.commands[cmd].exec(msg, args);
	}

}