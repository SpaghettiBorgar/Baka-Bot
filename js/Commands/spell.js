const alphanumeric = /^[a-z0-9 ]+$/i;

module.exports = {
  description_engrish: "get the correct spelling of a word",
  description_german: "korrekte Schreibweise eines Wortes",
  usage: "spell <syllable 1> [syllable 2] [...]",
  func: (msg, arg) => {
    if (arg.length == 0)
      return msg.channel.send(":x: you have to specify a word")
    if (!alphanumeric.test(arg.join(" ")))
      return msg.channel.send(":x: message has to be alphanumeric");
    for (let n = 0; n < arg.length; n++) {
      arg[n] = shuffle(arg[n]);
    }
    return msg.channel.send(arg.join(""));
  }
}

function shuffle (str) {
    let a = str.split("");
    let n = a.length;

    for(let i = n - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a.join("");
}
