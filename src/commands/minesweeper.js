const sweeper = require("../../node_modules/minesweeper/sweeper.js");
const r = {
	"*": "x",
	"0": "zero",
	"1": "one",
	"2": "two",
	"3": "three",
	"4": "four",
	"5": "five",
	"6": "six",
	"7": "seven",
	"8": "eight",
	"9": "nine"
};

module.exports = {
	exec: function(msg, args) {
		let width = args[0] ? args[0] : 8;
		let height = args[1] ? args[1] : 8;
		let mines = args[2] ? args[2] : (width * height) / 8;
		if (mines > width * height || width * height > 256 || width < 1 || height < 1)
			return msg.channel.send("no");

		let grid = sweeper(width, height, mines).grid;
		let o = "";
		for (let y of grid) {
			for (let x of y) {
				o += `||:${r[x]}:||`;
			}
			o += "\n";
		}
		if (o.length > 2000)
			return msg.channel.send("too big");
		msg.channel.send(o);

	}
}
