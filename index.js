const Discord = require('discord.js');
var auth = require('./auth.json');
const client = new Discord.Client();
var logger = require('winston');
const fs = require('fs');

const prefix = '!';

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

//Configure Command framework
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}


client.once('ready', () => {
    logger.debug('Online!');
});

client.on('message', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'ping') {
        logger.debug('Ping Command Called');
        client.commands.get('ping').execute(message, args);
    }else if(command === 'rps'){
        logger.debug('RPS Command Called');
        client.commands.get('rps').execute(message, args);
    }else if(command === '8ball'){
        logger.debug('8 Ball Command Called');
        client.commands.get('8ball').execute(message, args);
    }else if(command === 'duel'){
        logger.debug('Wizard Duel Command Called');
        client.commands.get('duel').execute(message, args);
    }
});

client.login(auth.token);