const Image = require("./Features/Image");
const Standard = require("./Features/Standard");
const Text = require("./Features/Text");
const Voice = require("./Features/Voice");

exports.check = function (msg) {
  let prefix = config.prefix;
  if (!msg.content.substring(0,prefix.length) === prefix) return;
  let cmd = msg.content.substring(prefix.length).split(" ")[0].toLowerCase();
  let arg = msg.content.split(cmd)[1];
  let triggered = true;
  switch (cmd) {
    //Text commands
    case "ping":
      Text.ping(msg);
      break;
    //Image commands
    case "perhaps":
      Image.perhaps(msg);
      break;
    case "god":
      Image.god(msg);
      break;
      //Other Commands
    case "e621":
      Standard.e621(msg);
      break;
    default:
      triggered = false;
  }
  if (triggered) {
    if (msg.channel.type === "text")
      console.log(`${msg.guild.name}#${msg.channel.name}@${msg.author.username}> ${msg.content}`);
    else if (msg.channel.type === "dm")
      console.log(`DM@${msg.author.username}> ${msg.content}`);
    else if (msg.channel.type === "group")
      console.log(`GroupDM@${msg.author.username}> ${msg.content}`);
  }
}
