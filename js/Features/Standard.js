const request = require('request');

exports.banmyself = function (msg) {
  msg.guild.ban(msg.mentions.users.find("username", msg.author.username), {"days": 1, "reason": "k"});
  msg.channel.send("");
}

exports.e621 = function (msg) {
         //Force commands to only run in NSFW channels
      //  if (!(msg.channel.nsfw || msg.channel.name.substring(0,3)==="nsfw"))  {
        //    return msg.channel.send(local.channel_not_nsfw);
        //}

        let msgSplit = msg.content.split(' ');
        let msgSearch = '';
        let searchOrig = '';
        for (let i = 1; i < msgSplit.length; i++) {
            if (i === 1) {
                searchOrig = msgSplit[i];
            } else {
                searchOrig = searchOrig + ' ' + msgSplit[i];
            }
        }
        msg.channel.startTyping();

        msgSearch = 'order:score rating:explicit ' + searchOrig;
        request.get('https://e621.net/post/index.json', {
            qs: {
                limit: 200,
                tags: msgSearch
            },
            headers: {
                'User-Agent': 'Baka Discord Bot'
            }
        }, (error, response, body) => {
            if (error) {
                return msg.channel.send(local.http_error);
            }
            if (!error && response.statusCode === 200) {
                try {
                    body = JSON.parse(body);
                } catch (e) {
                    return msg.channel.send(local.parse_error);
                }
                if (typeof body !== 'undefined' && body.length > 0) {
                    // Filter response for bad items
                    body = body.filter(item => {
                        if (typeof item === 'undefined' || typeof item.tags !== 'string') return false;
                        return true;
                    });

                    if (body.length > 0) {
                            let random = Math.floor(Math.random() * body.length);
                            if (typeof (body[random]) !== 'undefined' && typeof (body[random].file_url) !== 'undefined') {  //&& body[random].file_url.substr(body[random].file_url.length - 3, body[random].file_url.length) !== "swf"
                                msg.channel.send(body[random].file_url);
                            } else {

                            }
                        return;
                    }
                }

                msg.channel.send(":x:Nothing found >:(");
            }
        });
}
