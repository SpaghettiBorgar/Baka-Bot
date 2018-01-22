
exports.check = msg => {
  let bully = Baka.config.bullywords;
  if (msg.mentions.everyone)
    return msg.channel.send("<:mention:400370585584271362>");
    for (let i = 0; i < bully.length; i++) {
      if (msg.content.toLowerCase().includes(bully[i]))
        return msg.channel.send("**bully = ban**");
    }
  if (msg.author.bot) return;
  let prefix = Baka.config.prefix;

  if (!msg.content.startsWith(prefix)) return;
  let cmd = msg.content.substring(prefix.length).split(" ")[0].toLowerCase();
  let arg = msg.content.substring(prefix.length).split(" ").splice(1);

  if(cmd in Baka.commands) {
    Baka.commands[cmd].func(msg, arg);
    if (msg.channel.type === "text")
      console.log(`${msg.guild.name}#${msg.channel.name}@${msg.author.username}> ${msg.content}`);
    else if (msg.channel.type === "dm")
      console.log(`DM@${msg.author.username}> ${msg.content}`);
  }

}
