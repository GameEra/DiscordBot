module.exports = {
    name: 'duel',
    description: "Wizard Duel Command",

    execute(message, args) {
        if (!(message.mentions.members.size > 0)) {
            return message.channel.send('Mention another member to play in this format: !duel @Opponent');
        }

        const player1 = message.author;
        const player2 = message.mentions.users.first();
        const duel = this;

        if (player1 === player2) {
            return message.channel.send('Mention another member that is not yourself. In this format: !duel @Opponent');
        }

        message.channel.send(player2.toString() + ', Do you want to duel ' + player1.toString() + '?').then(function (message) {
            message.react("✅")
            message.react("❌")
            message.awaitReactions((reaction, user) => user === player2 && (reaction.emoji.name == '✅' || reaction.emoji.name == '❌'),
                { max: 1, time: 10000 }).then(collected => {
                    if (collected.first().emoji.name == '❌') {
                        return message.channel.send(player2.toString() + ' Does not want to duel.');
                    } else {
                        duel.start(message, player1, player2);
                    }
                }).catch(() => {
                    message.reply('No reaction after 10 seconds, operation canceled');
                });
        }).catch(function () {
            console.log('error reacting to message')
        });
    },

    start(message, player1, player2) {
        message.channel.send(player1.toString() + ' is dueling ' + player2.toString() + '!');
        var flag = false;
        var p1Emoji = "";
        var p2Emoji = "";
        const duel = this;
        const duelChannel = message.channel;

        player1.send('Choose your Spell.').then(function (message) {
            message.react("✊")
            message.react("✋")
            message.react("✌️")
            message.awaitReactions((reaction, user) => user === player1 && (reaction.emoji.name == '✊' || reaction.emoji.name == '✋' || reaction.emoji.name == '✌️'),
                { max: 1, time: 10000 }).then(collected => {
                    if(collected.first()){
                        p1Emoji = collected.first().emoji.name;
                        if(!flag){
                            flag = true;
                        }else{
                            duel.score(duelChannel, player1, player2, p1Emoji, p2Emoji);
                        }
                    }
                }).catch(() => {
                    message.reply('No reaction after 10 seconds, operation canceled');
                });
        }).catch(function () {
            console.log('error reacting to message')
        });

        player2.send('Choose your Spell.').then(function (message) {
            message.react("✊")
            message.react("✋")
            message.react("✌️")
            message.awaitReactions((reaction, user) => user === player2 && (reaction.emoji.name == '✊' || reaction.emoji.name == '✋' || reaction.emoji.name == '✌️'),
                { max: 1, time: 10000 }).then(collected => {
                    if(collected.first()){
                        p2Emoji = collected.first().emoji.name;
                        if(!flag){
                            flag = true;
                        }else{
                            duel.score(duelChannel, player1, player2, p1Emoji, p2Emoji);
                        }
                    }
                }).catch(() => {
                    message.reply('No reaction after 10 seconds, operation canceled');
                });
        }).catch(function () {
            console.log('error reacting to message')
        });
    },

    score(duelChannel, player1, player2, p1Emoji, p2Emoji){
        if (p1Emoji === p2Emoji) return duelChannel.send("It's a tie!");

        switch (p1Emoji) {
            case '✊': {
                if (p2Emoji === '✋') return duelChannel.send(player2.toString() + " wins with " + p2Emoji);
                else return duelChannel.send(player1.toString() + " wins with " + p1Emoji);
            }
            case '✋': {
                if (p2Emoji === '✌️') return duelChannel.send(player2.toString() + " wins with " + p2Emoji);
                else return duelChannel.send(player1.toString() + " wins with " + p1Emoji);    
            }
            case '✌️': {
                if (p2Emoji === '✊') return duelChannel.send(player2.toString() + " wins with " + p2Emoji);
                else return duelChannel.send(player1.toString() + " wins with " + p1Emoji);
            }
            default: {
                return duelChannel.send("Some kind of error?");
            }
        }
    }
}