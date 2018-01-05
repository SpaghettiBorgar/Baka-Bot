const request = require('request');
exports.e621 = function (msg) {
         //Force commands to only run in NSFW channels
        if (!msg.channel.nsfw) {
            return msg.channel.send(":x:Lewd-stuff shall only be postet in NSFW-channels!");
        }

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
                //'User-Agent': 'Rem Discordbot https://github.com/DasWolke/discordbot'
                'User-Agent': 'Discord Bot'
            }
        }, (error, response, body) => {
            if (error) {
                return msg.channel.send(":DogeThump: Ein HTTP Fehler ist aufgetreten!:NotLikeThis:");
            }
            if (!error && response.statusCode === 200) {
                try {
                    body = JSON.parse(body);
                } catch (e) {
                    return msg.channel.send("Beim Parsen der JSON Datei vom Server ist ein Fehler aufgetreten!:DogeAngry:");
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
                               // msg.channel.sendMessage(":DogeThinking: Die JSON Datei vom Server konnte nicht gelesen werden!:DogeAngry:");
                            }
                        return;
                    }
                }

                msg.channel.send(":x:Nothing found >:(");
            }
        });
}
