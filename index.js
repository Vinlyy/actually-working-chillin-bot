//libs & variables \\
const Discord = require('discord.js');
const bot = new Discord.Client
const client = new Discord.Client
const PREFIX = "c!"
const ytdl = require("ytdl-core");
const ping = require('minecraft-server-util')
var servers = {};

bot.once('ready', () => {
    console.log("Ready!")
    bot.user.setActivity("c!help")
})

bot.on("message", async message => {
    let prefix = "v!"
    let messageArray = message.content.split(" ")
    const args = message.content.slice(prefix.length).trim().split(/ + /g)
    const cmd = args.shift().toLowerCase()

    if (cmd === "help")message.reply("The commands are c!kick and c!ban")
})


bot.on("message", async message => {
		if(message.member.hasPermission(['KICK_MEMBERS']))
	if(message.content.startsWith('c!kick')) {
		let member = message.mentions.members.first();
			message.channel.send(member.displayName + " hasn't been very chill >8)")
			member.kick().then(() => {
		})
	}
})

bot.on("message", async message => {
        if(message.member.hasPermission(['BAN_MEMBERS']))
    if(message.content.startsWith('c!ban')) {
        let member = message.mentions.members.first();
            member.ban().then(() => {
            message.channel.send(member.displayName + " has been REALLY not chill >>8)")
        })
    }
})

bot.on("guildMemberAdd", member =>{
    const chan = member.guild.channels.cache.find(channel => channel.name === "welcome");
    if(!chan) return;

        chan.send(`Welcome to the chill server, ${member}, read #rules rN noOB`)
})

bot.on('message', message =>{
 
    let args = message.content.substring(PREFIX.length).split(' ')
 
    switch(args[0]){
        case 'mc':
 
            if(!args[1]) return message.channel.send('Provide a server ip.')
            if(!args[2]) return message.channel.send('Provide a port, it is usually 25565.')
 
            ping(args[1], parseInt(args[2]), (error, reponse) =>{
                if(error) throw error
                const Embed = new RichEmbed()
                .setTitle('Server Status')
                .addField('Server IP', reponse.host)
                .addField('Server Version', reponse.version)
                .addField('Online Players', reponse.onlinePlayers)
                .addField('Max Players', reponse.maxPlayers)
               
                message.channel.send(Embed)
            })
        break
 
    }
 
})

bot.login("NjkyNDgyMDQzODc1MTY0MzAw.XnvKOQ.neazVe6-kukpF_oVNOUCOTmyGyY")
