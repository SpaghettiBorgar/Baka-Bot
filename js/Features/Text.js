exports.ping = function(msg) {
  msg.channel.send("Pong!");
}

exports.owo = function(msg) {
  msg.channel.send("What's this?");
}

exports.help =function(msg) {
  msg.channel.send("you need help? kys");
}

exports.git =function(msg) {
  msg.channel.send("https://github.com/DasDoge/Baka-Bot");
}

exports.say = function (msg, arg) {
    let split = arg.split(" ");
    let string = "";
    for (let i = 0; i<split.length; i++) {
        string += split[i] + " ";
    }
    if (string)
        msg.channel.sendMessage(string);
    msg.delete();
}
