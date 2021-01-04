module.exports = {
    name: 'ping',
    description: "Ping Pong Command",
    execute(message, args){
        message.channel.send('pong!')
    }
}