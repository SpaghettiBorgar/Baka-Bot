const fs = require("fs");
var words = {};

for(let file of fs.readdirSync("./media/words")) {
	words[file] = fs.readFileSync("./media/words/" + file).toString().split("\n");
}

exports.random = function(list) {
	if (words[list])
		return words[list][Math.floor(Math.random() * words[list].length)];
}

exports.get = function(list, index) {
	if (words[list])
		return words[list][index - 1];
}

exports.range = function(list, a, b) {
	a -=1;
	b -=1;
	if (words[list] && words[list][a] && words[list][b])
		return words[list][Math.floor(Math.random() * (b - a) + a)];
}

exports.find = function(list, word) {
	if (words[list])
		return words[list].indexOf(word) + 1;
}

exports.list = function() {
	return Object.keys(words).join(", ");
}

exports.words = words;