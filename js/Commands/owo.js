module.exports = {
  description_engrish: "What's this?",
  description_nazi: "WAS IST DAS?",
  usage: "owo",
  func: (msg, arg) => {
    let dir = fs.readdirSync("./media/owo/");
    let n = parseInt(arg[0]) + 1;
    isNaN(n) ? msg.channel.send( new Discord.Attachment("./media/owo/".concat( dir[ Math.floor(Math.random()*dir.length) ] ) ) ) :
    msg.channel.send( new Discord.Attachment("./media/owo/".concat( dir[ n%dir.length ] ) ) );
  }
}
