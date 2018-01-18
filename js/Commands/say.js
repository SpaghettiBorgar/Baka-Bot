module.exports = {
  description_engrish: "let Baka say something",
  description_german: "lass Baka etwas sagen",
  usage: "say <text>",
  func: (msg, arg) => {
    let string = "";
    for (let i = 0; i<arg.length; i++) {
        string += arg[i] + " ";
    }
    if (string)
        msg.channel.send(string);
    msg.delete();
  }
}
