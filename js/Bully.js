const m = require("./Models");

exports.note = msg => {

  //console.log(`${msg.author.username} bullies in ${msg.guild.name}#${msg.channel.name}!`);
  updateGuild(msg.guild.id)
  .catch(err => {
    console.error(err);
  });


  function updateGuild(guildId) {
    return new Promise((resolve, reject) => {
      m.Models.guild.findOne({"id":guildId}, (err, qGuild) => {
        if (err)
          reject(err);
        debugger;
        if (qGuild == null)
          qGuild = new m.Models.guild({id: guildId});
        apply(qGuild).then((guild, err) => {
          debugger;
          qGuild = guild;
          qGuild.save();
        });
        resolve();
      });
    });
  }

  function apply(guild) {
    return new Promise((resolve, reject) => {
      let ind;
      debugger;
      for (let i = 0; i < guild.bullies.length; i++) {
        if (guild.bullies[i].userId == msg.author.id) {
          ind = i;
          break;
        }
      }
      if (ind == null) {
        guild.bullies.push({userId: msg.author.id, value: 0});
        ind = guild.bullies.length - 1;
      }
      guild.bullies[ind].value++;
      resolve(guild);
    });
  }

}
