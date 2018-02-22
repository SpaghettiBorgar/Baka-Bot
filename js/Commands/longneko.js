var n1 = "<:neko1:416336103788904448>";
var n2 = "<:neko2:416336103247708170>";
var n3 = "<:neko3:416336103738572806>";

module.exports = {
  func: (msg, arg) => {
    let len = arg[0] ? Math.round(parseFloat(arg[0])) : 1;
    if (len == null || isNaN(len) || len > 100)
      return msg.channel.send(":x:invalid length");
    let text = "\n";
    text += n1 + "\n";
    for (let i = 0; i < len; i++) {
      text += n2 + "\n";
    }
    text += n3;
    msg.channel.send(text).catch(e=>{msg.channel.send("```" + e + "```")})
  }
}
