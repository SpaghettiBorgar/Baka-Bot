module.exports = {
  func: function (msg) {
    msg.guild.ban(msg.mentions.users.find("username", msg.author.username), {"days": 1, "reason": "kek"}).catch(err => {
      return msg.channel.send("I can't >:(");
    })
    msg.channel.send("k");
  }
}
