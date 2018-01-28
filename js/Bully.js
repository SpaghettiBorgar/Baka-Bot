const m = require("./Models");

exports.note = msg => {
  let author = msg.author;
  let user;
  let userguild;

  console.log(`${author.username} bullies in ${msg.guild.name}#${msg.channel.name}!`);
  m.Models.user.findOne({"id": author.id}, (err, qUser) => {  //Find user in database
    if (err)
      return console.error(err);

    m.Models.guild.findOne({"id": msg.guild.id}, (err, qGuild) => { //Find guild in database
      if (err)
        return console.error(err);
      if (qGuild == null) {   //Create new guild entry if there is none
        qGuild = new m.Models.guild({id: msg.guild.id, name: msg.guild.name});
      }
      userguild = qGuild;
      userguild.save();
    }).then( ()=>{

    if (qUser == null) {   //Create new user entry if there is none
      qUser = new m.Models.user({id: author.id, name: author.user.tag, bullypoints: [{guild: userguild, value: 0}]});
    }
    user = qUser;

    let bpoints = user.bullypoints;
    let found = false;
    for (let i = 0; i < bpoints.length; i++) {    //Search for bullypoints in the specified guild
        if (bpoints[i].guild.id == userguild.id) {
          found = true;
          bpoints[i].value = bpoints[i].value + 1;
          break;
        }
    }
    if (found == false) {   //If there was no entry for that guild, add a new one
      user.bullypoints.push({guild: userguild, value: 1});
    }
    user.save();  //Apply changes to the database
    return;
  });
  });
}
