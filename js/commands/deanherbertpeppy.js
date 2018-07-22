var dean = require("./dean");
var herbert = require("./herbert");
var peppy = require("./peppy");

module.exports = {
  description_engrish: "Dean Herbert (peppy)",
  description_nazi: "Dean Herbert (peppy)",
  usage: "deanherbertpeppy",
  func: (msg, arg) => {
    dean.func(msg, arg);
    herbert.func(msg, arg);
    peppy.func(msg, arg);
  }
}
