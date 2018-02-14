exports.run = function() {
  global.Discord = require("discord.js");
  global.mongoose = require("mongoose");

  var fs = require("fs");
  var MessageHandler = require("./MessageHandler");
  var Models = require("./Models");
  var Bully = require("./Bully");

  global.Baka = {
    config: JSON.parse(fs.readFileSync("config.json")),
    client: new Discord.Client(),
    token: JSON.parse(fs.readFileSync("token.json")).token
  };


  Baka.client.on("ready", () => {
    console.log(`Logged in as ${Baka.client.user.tag}!`);
	  timeOut = 0;
	  Baka.client.user.setGame("#BottoLifesMatter");
  });

  Baka.client.on("message", msg => {
    if (MessageHandler.checkBully(msg)) {
      Bully.note(msg);
      return;
    }
    MessageHandler.check(msg);

  });

  Baka.client.on("messageReactionAdd", (msgRct,usr) => {
      MessageHandler.react(msgRct,usr);
  });

  Baka.login = function() {
  	Baka.client.login(Baka.token);
  };

  Baka.connectDB = function() {
    let db = mongoose.connection;
    mongoose.connect(Baka.config.mongoURL);
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
      console.log(`Connected to ${db.client.s.url}`)
    });
  }

  Baka.load = function() {
      //config
      Baka.config = JSON.parse(fs.readFileSync("config.json"));
      //MessageHandler
      delete require.cache[require.resolve("./MessageHandler")];
      MessageHandler = require("./MessageHandler");
      MessageHandler.load();
      //Bully
      delete require.cache[require.resolve(`./Bully`)];
      Bully = require("./Bully");
      //Commands
      Baka.commands = {};
      let commands = fs.readdirSync('./js/Commands/');
      for (let i=0; i<commands.length; i++) {
        let item = commands[i];
        if (item.endsWith(".js")) {
          item = item.slice(0, -3);
          delete require.cache[require.resolve(`./Commands/${item}`)];
          Baka.commands[item] = require(`./Commands/${item}`);
        }
      }
  };

  Models.generate();
  Baka.load();
  Baka.connectDB();
  Baka.login();
}
