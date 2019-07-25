const { Convert } = require ('any-to-any');

module.exports = {
	exec: function(msg, args) {
		let inBase = args[0].split("_")[1];
		inBase = inBase ? inBase : 10;
		let inNumber = args[0].split("_")[0];
		let wrap = args[1] ? args[1] : 8;
		let outNumber = Convert(inNumber, inBase, 2);
		outNumber = "0".repeat(8 - outNumber.length % 8) + outNumber;
		outNumber = outNumber.replace(/0/g, '░').replace(/1/g, '█').split('');
		let ret = Convert(inNumber, inBase, 16);
		while(outNumber.length > 0)
			ret += "\n" + outNumber.splice(0, wrap).join('');
		msg.channel.send(ret);
	}
}
