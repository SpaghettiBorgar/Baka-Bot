global.Discord = require("discord.js");
const fs = require("fs");
const CommandHandler = require("./CommandHandler");
const token = JSON.parse(fs.readFileSync("token.json")).token;


global.client = new Discord.Client();
global.config = JSON.parse(fs.readFileSync("config.json"));
global.local = JSON.parse(fs.readFileSync(`localisation/${config.language}.json`));

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
  try {
  	client.login(token);
  } catch(err) {
    timeOut = timeOut + 1;
    console.log(`login failed, retrying in ${Math.pow(2, timeOut)} seconds`)
  	return setTimeOut(login, Math.pow(2, timeOut));
  }
}

login();

client.on("message", msg => {
  if (msg.mentions.everyone)
    return msg.channel.send("<:mention:400370585584271362>");
  if (msg.author.bot) return;
  CommandHandler.check(msg);
});
