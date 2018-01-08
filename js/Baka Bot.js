global.Discord = require("discord.js");
const fs = require("fs");
const CommandHandler = require("./CommandHandler");

global.client = new Discord.Client();
global.config = JSON.parse(fs.readFileSync("config.json"));

var timeOut = 0;

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
	timeOut = 0;
	client.user.setGame("#BottoLifesMatter");
});

client.on("disconnect", e => {
	timeOut = timeOut + 1;
	setTimeOut(login, Math.pow(2, timeOut));
});

var login = function(){
	client.login(config.token);
}

login();

client.on("message", msg => {
  if (msg.author.bot) return;
  CommandHandler.check(msg);
});
