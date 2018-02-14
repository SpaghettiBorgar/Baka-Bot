exports.check = msg => {
  msg.content = msg.content.replace("⁣", "");
  if (msg.mentions.everyone)
    return msg.channel.send("<:mention:400370585584271362>");

  if (msg.author.bot) return;
  let prefix = Baka.config.prefix;

  if (!msg.content.startsWith(prefix)) return;
  let cmd = msg.content.substring(prefix.length).split(" ")[0].toLowerCase();
  let arg = msg.content.substring(prefix.length).split(" ").splice(1);

  if(cmd in Baka.commands) {
    if (msg.channel.type === "text")
      console.log(`${msg.guild.name}#${msg.channel.name}@${msg.author.username}> ${msg.content}`);
    else if (msg.channel.type === "dm")
      console.log(`DM@${msg.author.username}> ${msg.content}`);
    try{
      Baka.commands[cmd].func(msg, arg);
    } catch(err) {
      console.error(err);
      return msg.channel.send(":x:Woops, that command :b:roke");
    }
  }
}

exports.react = (msgRct, usr) => {
  switch(msgRct.emoji.id) {
    case Baka.config.bullyemote:

      break;
  }
  return;
};

exports.checkBully = msg => {
  let text = ` ${msg.content.toLowerCase()} `;
  let foundSomething = false;

  let excludes = Baka.config.bullyexcludes;
  excludes.forEach(item => {
    if (text.includes(` ${item} `)) return;

  });

  let bullypairs = Baka.config.bullywords;
  for (let i = 0; i < bullypairs.length; i++) {
    let parts = bullypairs[i];

    for (let j = 0; j < parts.length; j++) {
      foundSomething = false;
      let words = parts[j];

      for (let k = 0; k < words.length; k++) {
        if (text.includes(` ${words[k]} `)) {
          foundSomething = true;
          break;
        }
      }
      if (foundSomething == false)  break;
    }
    if (foundSomething == true) {
        return msg.react(Baka.config.bullyemote);
    };
  }

}

exports.load = function() {
  delete require.cache[require.resolve("./Bully")];
}
