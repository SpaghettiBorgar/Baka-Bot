module.exports = {
  func: function (msg, arg) {
    debugger;
    let mem = msg.mentions.users.array()[0];
    console.log(mem);
    return msg.channel.send(mem.avatarURL);
  }
}
