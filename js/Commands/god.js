module.exports = {
  description_engrish: "#1",
  description_german: "#1",
  usage: "god",
  func: (msg, arg) => {
      msg.channel.send(new Discord.Attachment("media/god.jpg"));
  }
}
