module.exports = {
  description_engrish: "the perhaps cow",
  description_german: "ein Bild der Möglicherweise-kuh",
  usage: "perhaps",
  func: (msg, arg) => {
      msg.channel.send(new Discord.Attachment("media/perhaps.png"));
  }
}
