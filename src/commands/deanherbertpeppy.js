const dean = require("./dean");
const herbert = require("./herbert");
const peppy = require("./peppy");

module.exports = {
	exec: function (msg, args) {
		dean.exec(msg, args);
		herbert.exec(msg, args);
		peppy.exec(msg, args);
	}
}