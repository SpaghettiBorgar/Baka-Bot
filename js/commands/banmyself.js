module.exports = {
  func: function (msg) {
    msg.guild.ban(msg.member, {"days": 0, "reason": "noob"}).then(function() {
      msg.channel.send("k");
    }, err => {
      return msg.channel.send("I can't >:(");
    })
  }
}
