const Discord = require('discord.js');
var auth = require('./auth.json');
const client = new Discord.Client();
var logger = require('winston');

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

//TODO - Setup a structure for BOT STATUS tracking (Make sure cinnection isn't NULL before usage ie leaving)
var connection = "";

client.once('ready', () => {
	logger.info('Ready!');
});

client.login(auth.token);

client.on('message', async message => {
    // Join the same voice channel of the author of the message
    if (message.content === '!join'){
        if (message.member.voice.channel) {
            connection = await message.member.voice.channel.join();
        }
    }
    if (message.content === '!leave'){
            connection.disconnect();
    }
});

// client.on('message', message => {
//     console.log(message.content);
//     if (message.content === '!ping') {
//         // send back "Pong." to the channel the message was sent in
//         message.channel.send('Pong.');
//     }
// });