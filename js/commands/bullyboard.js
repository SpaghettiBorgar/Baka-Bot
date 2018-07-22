//var m = require("../Models");

module.exports = {
  description_engrish: "See who bullies the most",
  description_nazi: "Mobbing Statistiken",
  usage: "bullyboard [page]",
  func: (msg, arg) => {
    let m = require("../Models");
    generateEmbed = function generateEmbed() {

      let amount = Math.min((arg[0] ? parseInt(arg[0]) : 10), scores.length);
      if (isNaN(amount))
        return "invalid number >:(";

      let embed = new Discord.RichEmbed();
      embed.setTitle(`Bully leaderboards for ${msg.guild.name}`);
      embed.setColor(16754447);

      let uField = "";
      let vField = "";
      for (i = 0; i < amount; i++) {
        uField += `${i+1}\t${scores[i].name}\n`;
        vField += `${scores[i].value}\n`;
      }
      embed.addField("#\tUser\t", uField, true);
      embed.addField("bullypoints", vField, true);

      return embed;

    };

    let scores = [];
    let guild = msg.guild;
    let start = new Date();

    m.guild.findById(msg.guild.id, (err, qGuild) => {

      if (qGuild == null) {
        qGuild = new m.guild({
          _id: guild.id
        });
        qGuild.save()
      }

      if (err)
        console.error(err);

      if (qGuild.bullies.length == 0)
        return msg.channel.send(
          "No boolies yet <:woo:413435790245494785>");

      for (bully of qGuild.bullies) {
        let member = guild.members.find("id", bully._id);
        if (member) {
          scores.push({
            name: member.displayName,
            value: bully.value
          });
        }
      }

      scores.sort((a, b) => {
        return b.value - a.value;
      });

      var emb = generateEmbed();
      msg.channel.send(emb);

    });
  }
}
