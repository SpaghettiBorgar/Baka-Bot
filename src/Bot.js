const Discord = require("discord.js");
const mongoose = require("mongoose");
const dateformat = require("dateformat");
const fs = require("fs");

const msgHandler = require("./MessageHandler");

global.Baka = {
	client: new Discord.Client({ disableEveryone: true }),
	config: {},
	commands: {},
	tableflipped: null
}

Baka.client.on("ready", () => {
	console.log("logged in");
	Baka.client.user.setPresence({ game: { type: "WATCHING", name: Baka.client.users.size + " people wank", status: "online" } });
});

Baka.client.on("message", msg => {
	msgHandler.handle(msg);
});

function init() {
	Baka.config = JSON.parse(fs.readFileSync("./config.json"));
	Baka.commands = {};
	let commands = fs.readdirSync('./src/commands/');
	for (let i = 0; i < commands.length; i++) {
		let item = commands[i];
		if (item.endsWith(".js")) {
			item = item.slice(0, -3);
			delete require.cache[require.resolve(`./commands/${item}`)];
			Baka.commands[item] = require(`./commands/${item}`);
		}
	}
}

Baka.log = function (txt) {
	console.log(`[${dateformat(new Date(), Baka.config.logTimeFormat)}] ${txt}`);
}

init();
Baka.client.login(Baka.config.token);
debugger;