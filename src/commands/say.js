module.exports = {
	exec: function (msg, args) {
		msg.channel.send(args.join(" "));
	}
}