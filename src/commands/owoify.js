module.exports = {
	exec: function(msg, args) {
		msg.channel.send(args.join(" ")
		.replace(/r/gi, "w")
		.replace(/f/gi, "fw")
		.replace(/ww/gi, "w")
		.replace(/[ou]/gi, "$&w$&")
		.replace(/ki/gi, "ky")
		.replace(/gi/gi, "gy")
		.replace(/ni/gi, "ny")
		);
	}
}
