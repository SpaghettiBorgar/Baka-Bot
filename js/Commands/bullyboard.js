var m = require("./../Models");

module.exports = {
  description_engrish: "See who bullies the most",
  description_german: "Mobbing Statistiken",
  usage: "bullyboard [page]",
  func: (msg, arg) => {

    let scores = [];
    let bullies;
    let bullyIds = [];

    m.Models.guild.findOne({id: msg.guild.id}, (err, qGuild) => {
      if (err)
        console.error(err);

      bullies = qGuild.bullies;
      for (let i = 0; i < bullies.length; i++) {
        bullyIds[i] = bullies[i].userId;
      }

      fillScores()

    });

    function fillScores() {
      let members = msg.guild.members.array();
      for (let i = 0; i < members.length; i++) {
        if (bullyIds.includes(members[i].id))
          scores.push({"name": (members[i].nickname ? members[i].nickname : members[i].user.username), "value": bullies[bullyIds.indexOf(members[i].id)].value});
      }

      scores.sort((a, b) => {
        return b.value - a.value;
      });

      generateEmbed();
    }

    function generateEmbed() {
      let amount = Math.min((arg[0] ? parseInt(arg[0]) : 10), scores.length);
      let embed = new Discord.RichEmbed();
      embed.setTitle(`Bully leaderboards for ${msg.guild.name}`);
      let nField = "";
      let uField = "";
      let vField = "";
      for (i = 0; i < amount; i++) {
        nField += `${i+1}\n`;
        uField += `${scores[i].name}\n`;
        vField += `${scores[i].value}\n`;
      }
      embed.setColor(16754447);
      embed.addField("# ", nField, true);
      embed.addField("User\t", uField, true);
      embed.addField("bullypoints", vField, true);

      msg.channel.send(embed);
    }
  }
}

/*
[   MessageEmbedField {
       embed: [Circular],
       name: 'Player',
       value: '#1 Emilia\n\n#2 spaghetto',
       inline: true },
     MessageEmbedField {
       embed: [Circular],
       name: 'Exp points',
       value: '63\n\n20',
       inline: true },
     MessageEmbedField {
       embed: [Circular],
       name: 'Ducks killed',
       value: '1\n\n2',
       inline: true } ],
*/
