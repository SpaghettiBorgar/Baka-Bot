

exports.getGuild = function(id) {
	return new Promise((res, rej) => {
		Baka.mongo.collection("guilds").findOne({_id: id}, (err, doc) => {
			if (err)
				rej(Baka.log(err, 3));
			if (!doc)
				doc = exports.newGuild(id);
			res(doc);
		});
	});
}

exports.allGuilds = function() {
	return new Promise((res, rej) => {
		Baka.mongo.collection("guilds").find({}).toArray((err, docs) => {
			if (err)
				rej(Baka.log(err, 3));
			res(docs);
		});
	});
}

exports.newGuild = function(id) {
	return new Promise((res, rej) => {
		let guild = {
			_id: id,
			bullies: {},
			emojistats: {}
			
		};
		Baka.mongo.collection("guilds").insertOne(guild).then(() => res(guild));
	});
}

exports.updateGuild = function(id, update) {
	Baka.mongo.collection("guilds").updateOne({_id: id}, update).then(resp=>{
		if (resp.matchedCount == 0) {
			exports.newGuild(id).then(user => {
				exports.updateGuild(id, update);
			});
		}
	});
}

exports.getUser = function(id) {
	return new Promise((res, rej) => {
		Baka.mongo.collection("users").findOne({_id: id}, (err, doc) => {
			if (err)
				rej(Baka.log(err, 3));
			if (!doc)
				doc = exports.newUser(id);
			res(doc);
		});
	});
}

exports.allUsers = function() {
	return new Promise((res, rej) => {
		Baka.mongo.collection("users").find({}).toArray((err, docs) => {
			if (err)
				rej(Baka.log(err, 3));
			res(docs);
		});
	});
}

exports.newUser = function(id) {
	return new Promise((res, rej) => {
		let user = {
			_id: id,
			bullypoints: 0,
			since: null,
			lastmessage: null
		};
		Baka.mongo.collection("users").insertOne(user).then(() => res(user));
	});
}

exports.updateUser = function(id, update) {
	Baka.mongo.collection("users").updateOne({_id: id}, update).then(resp=>{
		if (resp.matchedCount == 0) {
			exports.newUser(id).then(user => {
				exports.updateUser(id, update);
			});
		}
	});
}

exports.getEmoji = function(id) {
	return new Promise((res, rej) => {
		Baka.mongo.collection("emojis").findOne({_id: id}, (err, doc) => {
			if (err)
				rej(Baka.log(err, 3));
			if (!doc)
				doc = exports.newEmoji(id);
			res(doc);
		});
	});
}

exports.allEmojis = function() {
	return new Promise((res, rej) => {
		Baka.mongo.collection("emojis").find({}).toArray((err, docs) => {
			if (err)
				rej(Baka.log(err, 3));
			res(docs);
		});
	});
}

exports.newEmoji = function(id) {
	return new Promise((res, rej) => {
		let emoji = {
			_id: id,
			count: 0
		};
		Baka.mongo.collection("emojis").insertOne(emoji).then(() => res(emoji));
	});
}

exports.updateEmoji = function(id, update) {
	Baka.mongo.collection("emojis").updateOne({_id: id}, update).then(resp=>{
		if (resp.matchedCount == 0) {
			exports.newEmoji(id).then(user => {
				exports.updateEmoji(id, update);
			});
		}
	});
}