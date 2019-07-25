//require('@tensorflow/tfjs-node');	// waiting for fix
//global.fetch = require("node-fetch");	// (hopefully) temporary workaround
//const toxicity = require('@tensorflow-models/toxicity');
const emojistats = require("./EmojiStatistics");
const nlp = require("compromise");
const chalk = require("chalk");
const tableflip = "┻━┻";
const unflip = "┬─┬";
//const bullyThreshold = 0.5;
//var bullyDetector;
/*
toxicity.load(bullyThreshold).then(model => {
	bullyDetector = model;
	Baka.log("Successfully loaded tensorflow-models/toxicity", 0);
});
*/
exports.handle = function (msg) {
/*
	if (bullyDetector) {
		let startTime = new Date();
		let text = nlp(msg.content).normalize().out();
		bullyDetector.classify(text).then(results => {
			if (results.some(e => e.results[0].match)) {
				Baka.log(`Bully classification took ${new Date() - startTime}ms`);
				Baka.log(`Message by ${msg.author.tag}: ${msg.content}`);
				results.sort((a,b) => {return b.results[0].probabilities[1] - a.results[0].probabilities[1]});
				for (prediction of results)
					Baka.log(`${prediction.results[0].match ? chalk.green(prediction.label) : chalk.red(prediction.label)}: ${prediction.results[0].probabilities[1]}`);
				if (msg.channel.id == "505810604372525079") {
					let temp = "";
					for (let i = 0; i < 3; i++)
						temp += `${results[i].label}: ${results[i].results[0].probabilities[1]} | `;
					temp = temp.substr(0, temp.length - 2);
					msg.channel.send(temp);
				}
			}
		});
	}
*/
	if (msg.content.includes(tableflip))
		Baka.tableflip = msg.author.toString();
	else if (msg.content.includes(unflip))
		Baka.tableflip = null;

	if (msg.content.startsWith(Baka.config.prefix) && msg.author != Baka.client.user) {
		let cmd = msg.content.split(" ")[0].substr(Baka.config.prefix.length);
		let args = msg.content.split(" ").splice(1);
		if (Baka.commands.hasOwnProperty(cmd)) {
			Baka.log((msg.channel.type == "text" ? `${msg.guild.name}#${msg.channel.name}` : ``) + `@${msg.author.username}: ${msg.content}`);
			Baka.commands[cmd].exec(msg, args);
		}
	}

	if (!msg.author.bot)
		emojistats.processMessage(msg);
}