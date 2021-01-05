module.exports = {
    name: '8ball',
    description: "8 Ball Command",
    execute(message, args){
        const acceptedReplies = ['Not likely', 'Perhaps', 'Absolutely', 'It is decidedly so', 'Ask again', 'Do not count on it', 'Without a doubt', 'My sources say no' ];
        const random = Math.floor((Math.random() * acceptedReplies.length));
        const result = acceptedReplies[random];
        if(args[0] !== ""){
            message.channel.send(result);
        }
    }
}