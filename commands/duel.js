module.exports = {
    name: 'duel',
    description: "Wizard Duel Command",

    execute(message, args) {

        if (!(message.mentions.members.size > 0)) {
            return message.channel.send('Mention another member to play in this format: !duel @Opponent');
        }
        const player1 = message.author;
        const player2 = message.mentions.users.first();
        if (player1 === player2) {
            return message.channel.send('Mention another member that is not yourself. In this format: !duel @Opponent');
        }
        var flag  = false;
            message.channel.send(player2.toString() + ', Do you want to duel ' + player1.toString() + '?').then(function (message) {
                message.react("✅")
                message.react("❌")
                message.awaitReactions((reaction, user) => user === player2 && (reaction.emoji.name == '✅' || reaction.emoji.name == '❌'),
                    { max: 1, time: 10000 }).then(collected => {
                        if (collected.first().emoji.name == '❌') {
                            return message.channel.send(player2.toString() + ' Does not want to duel.');
                        }else{
                            flag =true;
                        }
                    }).catch(() => {
                        message.reply('No reaction after 10 seconds, operation canceled');
                    });
            }).catch(function () {
                console.log('error reacting to message')
            });
        if(flag){
            message.channel.send('we made it');
        }


        


    }
}