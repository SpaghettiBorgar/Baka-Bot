module.exports = {
  description_engrish: "PONG!",
  description_german: "PONG!",
  usage: "ping",
  func: (msg, arg) => {
      msg.channel.send("Pong!");
  }
}
