const m = require("./Models");

exports.note = msg => {

  updateGuild(msg.guild.id)
    .catch(err => {
      console.error(err);
    });


  function updateGuild(guildId) {
    return new Promise((resolve, reject) => {
      m.guild.findById(guildId, (err, guild) => {
        if (err)
          reject(err);
        if (guild == null)
          guild = new m.guild({
            _id: guildId
          });
        let ind;
        for (let i = 0; i < guild.bullies.length; i++) {
          if (guild.bullies[i]._id == msg.author.id) {
            ind = i;
            break;
          }
        }
        if (ind == null) {
          guild.bullies.push({
            _id: msg.author.id,
            value: 0
          });
          ind = guild.bullies.length - 1;
        }
        guild.bullies[ind].value++;
        guild.save(err => {
          if (err)
            reject(err);
          else {
            resolve();
          }
        });
      });
    });
  }

  function apply(guild) {
    return new Promise((resolve, reject) => {
      let ind;
      for (let i = 0; i < guild.bullies.length; i++) {
        if (guild.bullies[i].userId == msg.author.id) {
          ind = i;
          break;
        }
      }
      if (ind == null) {
        guild.bullies.push({
          _id: msg.author.id,
          value: 0
        });
        ind = guild.bullies.length - 1;
      }
      guild.bullies[ind].value++;
      resolve(guild);
    });
  }

}
