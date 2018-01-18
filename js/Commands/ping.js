module.exports = {
  description_engrish: "PONG!",
  description_nazi: "PONG!",
  usage: "ping",
  func: (msg, arg) => {
      msg.channel.send("Pong!");
  }
}
