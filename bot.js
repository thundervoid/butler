var HTTPS = require('https'),
    botID = process.env.BOT_ID,
    options = {
        hostname: 'api.groupme.com',
        path: '/v3/bots/post',
        method: 'POST'
    };

function respond() {
    var request = JSON.parse(this.req.chunks[0]);

    if (request.text) { // there is a message
        if (request.user_id != process.env.BOT_USER_ID) { // message is not from bot
            this.res.writeHead(200);
            processMessage(request.text, request.name, request.user_id);
            this.res.end();
        }
    } else {
        console.log("nothing response for this post");
        this.res.writeHead(200);
        this.res.end();
    }
}

function processMessage(text, author, authorID) {
    var split = text.toUpperCase().split(' '),
        fName = author.split(' ');

    // butler response / fetch messages
    if (split[0] === 'BUTLER,') {
        if (retrieve.test(text)) {
            if (!please.test(text)) {
                createTextReq(selectFrom(please));
                return;
            } else {
                for (var i = 0; i < returns.length; i++) {
                    if (returns[i].regex.test(text)) {
                        createImageReq(returns[i].URL);
                        return;
                    }
                }
            }
        } else {
            // search for array of words
            // postMessage(selectFrom(pos) + fName[0] + ".");
            // return;
        }

        createTextReq(selectFrom(confused));
        return;

        // default response for an unknown prompt
        //   put inside initial if statement so the
        //   butler doesn't respond this to everything
        
    }

    // eric -> yung bitch message
    if (jav.test(text)) {
        createTextReq("Yung Bitch*");
        return;
    }
}

function selectFrom(responses) {
    var choice = Math.floor(Math.random() * responses.length);
    return responses[choice];
}


function createTextReq(text) {
    var body = {
        "bot_id" : botID,
        "text" : text
    };

    postRequest(options, body);
}

function createImageReq(imageURL) {
    var body = {
        "bot_id" : botID,
        "attachments" : [
          {
            "type" : "image",
            "url" : imageURL
          }
        ]
    };

    postRequest(options, body);
}

function postRequest(options, body) {
    var botReq = HTTPS.request(options, function(res) {
        if (res.statusCode != 202) {
            console.log('rejecting bad status code ' + res.statusCode);
        }
    });

    botReq.on('error', function(err) {
        console.log('error posting message '  + JSON.stringify(err));
    });

    botReq.on('timeout', function(err) {
        console.log('timeout posting message '  + JSON.stringify(err));
    });

    botReq.end(JSON.stringify(body));
}


/**
 * repsonses 
 */

var pos = [
    "Right away ",
    "Absolutely, ",
    "Anything for you, ",
    "On it, "
];

var neg = [
    "I'm afraid I can't do that, sir.",
    "You know I can't do that, sir.",
    "You're asking too much of me, sir.",
    "No sir, I will not do that."
];

var confused = [
    "I don't know what you mean, sir.",
    "I'm having trouble understanding what you want, sir",
    "Could you be more specific, sir?",
    "I cannot comprehend what you are asking."
];

var polite = [
    "You forgot to say please!",
    "Ask nicely please.",
    "I won't help you if you don't ask politley.",
    "Where are your manners, sir?"
];

/**
 * regex stuffs
 */
var retrieve = /(FETCH|GET|FIND|RETRIEVE|GRAB|SHOW)/i;
var please = /.*\bPLEASE\b.*/i;
var jav = /.*\jav\b.*/i;
var steamboat = /(STEAMBOAT|WHALE|STEAMER|WILLIE)/i;

/**
 * items to return
 */
var returns = [];

function Item(regex, URL) {
    this.regex = regex;
    this.URL = URL;
}

returns.push(new Item(steamboat, "http://i.groupme.com/557x420.jpeg.b1f1dc50e2f24b8b987ca9f661baa926"));

exports.respond = respond;
