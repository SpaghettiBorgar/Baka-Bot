global.Discord = require("discord.js");
const fs = require("fs");
const CommandHandler = require("./CommandHandler");

global.client = new Discord.Client();
global.config = JSON.parse(fs.readFileSync("config.json"));


client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
	client.user.setGame("#BottoLifesMatter");
});

client.login(config.token);

client.on("message", msg => {
  if (msg.author.bot) return;
  CommandHandler.check(msg);
});
