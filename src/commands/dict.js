const dictcc = require("dictcc-js");

module.exports = {
	exec: function(msg, args) {
		dictcc.translate(args[0], args[1], args.splice(2).join(' '), (res, err) => {
			if (err)
				return msg.channel.send(err);
			res.forEach((val, ind, arr) => {
				
			});
		});
	}
}