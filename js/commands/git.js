module.exports = {
  description_engrish: "Get a link to Baka Bot's GitHub repository",
  description_nazi: "Der Link zu Baka Bots GitHub repo",
  usage: "git",
  func: (msg, arg) => {
    msg.channel.send("https://github.com/DasDoge/Baka-Bot");
  }
}
