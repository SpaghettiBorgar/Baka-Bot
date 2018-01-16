
exports.check = msg => {

  if (msg.mentions.everyone)
    return msg.channel.send("<:mention:400370585584271362>");
  if (msg.author.bot) return;
  console.log("a");
  let prefix = Baka.config.prefix;

  if (!msg.content.startsWith(prefix)) return;
  let cmd = msg.content.substring(prefix.length).split(" ")[0].toLowerCase();
  let arg = msg.content.substring(prefix.length).split(" ").splice(1);

  if(cmd in Baka.commands) {
    console.log("b");
    Baka.commands[cmd].func(msg, arg);
    if (msg.channel.type === "text")
      console.log(`${msg.guild.name}#${msg.channel.name}@${msg.author.username}> ${msg.content}`);
    else if (msg.channel.type === "dm")
      console.log(`DM@${msg.author.username}> ${msg.content}`);
  }

}
