const Discord = require("discord.js");
const MongoClient = require("mongodb").MongoClient;
const dateformat = require("dateformat");
const fs = require("fs");
const chalk = require("chalk");
const msgHandler = require("./MessageHandler");
const mongo = require("./Mongo");

global.Baka = {
	client: new Discord.Client({ disableEveryone: true }),
	config: {},
	commands: {},
	mongo: null,
	tableflipped: null
}

Baka.client.on("ready", () => {
	Baka.log(`Logged in as ${Baka.client.user.tag} (${Baka.client.user.id})`, 0);
	Baka.client.user.setPresence({ game: { type: "WATCHING", name: Baka.client.users.size + " people wank", status: "online" } });
});

Baka.client.on("message", msg => {
	msgHandler.handle(msg);
	mongo.updateUser(msg.author.id, {$set: {lastmessage: new Date()}});
});

Baka.client.on("error", e => {
	Baka.log(e, 2);
});

Baka.client.on("presenceUpdate", (mOld, mNew) => {
	if (mNew.presence.status != mOld.presence.status) {
		mongo.updateUser(mNew.id, {$set: {since: new Date()}});
		Baka.log(mNew.id);
	}
});

function init() {
	Baka.config = JSON.parse(fs.readFileSync("./config.json"));

	let mongoclient = new MongoClient(Baka.config.mongoURL);
	mongoclient.connect(err => {
		if (err)
			Baka.log(err.toString(), 3);
		else
			Baka.log(`Connected to ${mongoclient.s.url}`, 0);;
		Baka.mongo = mongoclient.db();
	});

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

Baka.log = function (txt, level = 1) {
	switch(level) {
		case 0:
			console.info(chalk.bgGreen(`[${dateformat(new Date(), Baka.config.logTimeFormat)}]`), chalk.green(txt));
			break;
		case 1:
			console.log(chalk.bgWhite(`[${dateformat(new Date(), Baka.config.logTimeFormat)}]`), chalk.white(txt));
			break;
		case 2:
			console.warn(chalk.bgYellow(`[${dateformat(new Date(), Baka.config.logTimeFormat)}]`), chalk.yellow(txt));
			break;
		case 3:
			console.error(chalk.bgRed(`[${dateformat(new Date(), Baka.config.logTimeFormat)}]`), chalk.red(txt));
			break;
	}
}

init();
Baka.client.login(Baka.config.token);
