module.exports = {
  description_engrish: "the lord",
  description_german: "der einzigwahre",
  usage: "maniagod",
  func: (msg, arg) => {
      msg.channel.send(new Discord.Attachment("media/maniagod.png"));
  }
}
