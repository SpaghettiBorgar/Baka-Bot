const Image = require("./Modules/Image");
const Standard = require("./Modules/Standard");
const Text = require("./Modules/Text");
const Voice = require("./Modules/Voice");

exports.check = function (msg) {
  let prefix = config.prefix;
  if (!msg.content.substring(0,prefix.length) === prefix) return;
  let cmd = msg.content.substring(prefix.length).split(" ")[0];
  let arg = msg.content.split(cmd)[1];
  let triggered = true;
  switch (cmd) {
    case "ping":
      Text.ping(msg);
      break;
    default:
      triggered = false;
  }
if (triggered) {
	if (msg.channel.type === "text")
	{console.log(`${msg.guild.name}#${msg.channel.name}@${msg.author.username}> ${msg.content}`);}
	else if (msg.channel.type === "dm")
	{console.log(`DM@${msg.author.username}> ${msg.content}`);}
	else if (msg.channel.type === "group") {console.log(`GroupDM@${msg.author.username}> ${msg.content}`);}
}
}
