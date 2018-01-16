require('repl').start({});
exports.run = function() {
  global.Discord = require("discord.js");
  const fs = require("fs");
  const CommandHandler = require("./CommandHandler");

  global.Baka = {
    config: JSON.parse(fs.readFileSync("config.json")),
    client: new Discord.Client(),
    token: JSON.parse(fs.readFileSync("token.json")).token
  }


  Baka.client.on("ready", () => {
    console.log(`Logged in as ${Baka.client.user.tag}!`);
	  timeOut = 0;
	  Baka.client.user.setGame("#BottoLifesMatter");
  });

  Baka.client.on("message", msg => {
    CommandHandler.check(msg);
  });

  var login = function(){
  	Baka.client.login(Baka.token);
  }

  Baka.load = function() {
    Baka.commands = {};
    let commands = fs.readdirSync('./js/Commands/');
    for (let i=0; i<commands.length; i++) {
      let item = commands[i];
      if (item.endsWith(".js")) {
        item = item.slice(0, -3);
        Baka.commands[item] = require(`./Commands/${item}`);
      }
    }
  };

  Baka.load();
  login();
}
