module.exports = {
	exec: function (msg, args) {
		if (Baka.tableflip == null)
			msg.channel.send("Pong! :ping_pong:");
		else if (Baka.tableflip == Baka.client.user.toString())
			msg.channel.send("Sorry ;w;   Someone forced me to <:SadCat:508694945037680671>")
		else
			msg.channel.send(`Unfortunately we can't play ping pong since ${Baka.tableflip} flipped the table. What a killjoy!`);
	}
}