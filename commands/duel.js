module.exports = {
    name: 'duel',
    description: "Wizard Duel Command",
    execute(message, args){
        if(!(message.mentions.members.size > 0)){
            return message.channel.send('Mention another member to play in this format: !duel @Opponent');
        }
        const player1 = message.author;
        const player2 = message.mentions.users.first();

        message.channel.send(player2.toString() + ', Do you want to duel ' + player1.toString() +'?');
    }
}