//libs & variables \\
const {Client, RichEmbed} = require('discord.js');
const Discord = require('discord.js');
const bot = new Discord.Client;
const client = new Discord.Client;
const PREFIX = "c!";
const ytdl = require("ytdl-core");
const ping = require('minecraft-server-util');
const cheerio = require('cheerio');
const request = require('request');
const ms = require('ms');
const opusscript = require('opusscript')
const token = process.env.token
var queue = {};

bot.once('ready', () => {
    console.log("Ready!")
    bot.user.setActivity("c!help")
})

bot.on('message', message => {
    let args = message.content.substring(PREFIX.length).split(" ");
 
    switch (args[0]) {
        case 'mute':
            var person  = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));
            if(!person) return  message.reply("we can not bash user " + person + "'s head in because they are nonexistent.")
 
            let mainrole = message.guild.roles.cache.find(role => role.name === "✿Chill people✿");
            let role = message.guild.roles.cache.find(role => role.name === "not chill")
           
 
 
            let time = args[2];
            if(!time){
                return message.reply("You didnt specify a time that they will digest the rock");
            }
 
            person.removeRole(mainrole.id)
            person.addRole(role.id);
 
 
            message.channel.send(`@${person.user.tag}'s ability to talk is now not an existent part of their body becausse they swalloed a freaking rock, the rock surgery will happen in ${ms(ms(time))}`)
 
            setTimeout(function(){
               
                person.addRole(mainrole.id)
                person.removeRole(role.id);
                console.log(role.id)
                message.channel.send(`@${person.user.tag}'s rock surgery was successful.`)
            }, ms(time));
 
 
   
        break;
    }
 
 
});





bot.on('message', message => {
    let args = message.content.substring(PREFIX.length).split(" ");
   
 
    switch (args[0]) {

        case "help":
            message.reply("The command list is in your dms.")
            message.author.send("https://miller12109.wixsite.com/chillin-bot-commands");
        break;
    }
 
 
});

bot.on("message", async message => {
if(message.content.startsWith('c!info')) {
    message.channel.send('**Bot/User Info**')
    message.channel.send('Username: ' +  message.author.username + "")
    message.channel.send('Version: 0.0.1: (Not to public yet, subjected to release on 4/9/20)')
    message.channel.send('Current Guild: ' + message.guild.name + "")
    message.channel.send('Guild Acronym: ' + message.guild.nameAcronym + "")
    }
})



 //Moderation
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
        member.send("Thanks for joining!")

})

bot.on('message', message => {

    let args = message.content.substring(PREFIX.length).split(" ");

    switch (args[0]) {
        case 'birb':
        image(message);

        break;
    }

});

function image(message){

    var options = {
        url: "http://results.dogpile.com/serp?qc=images&q=" + "birb",
        method: "GET",
        headers: {
            "Accept": "text/html",
            "User-Agent": "Chrome"
        }
    };





    request(options, function(error, response, responseBody) {
        if (error) {
            return;
        }
  
 
        $ = cheerio.load(responseBody); 
 

        var links = $(".image a.link");
 
        var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));
        
        console.log("birb sent from " + message.member.displayName);

        if (!urls.length) {
           
            return;
        }
        // Send result
        message.channel.send( urls[Math.floor(Math.random() * urls.length)]);
    });
}


const randomPuppy = require('random-puppy');
const snekfetch = require('snekfetch');

module.exports.run = async (bot, message, args) => {

    let reddit = [
        "meme",
        "memes",
        "dankmemer"
    ]

    let subreddit = reddit[Math.floor(Math.random() * reddit.length)];

    message.channel.startTyping();

    randomPuppy(subreddit).then(async url => {
            await message.channel.send({
                files: [{
                    attachment: url,
                    name: 'meme.png'
                }]
            }).then(() => message.channel.stopTyping());
    }).catch(err => console.error(err));

};

module.exports.help = {
    name: 'meme',
    aliases: ['memes']
}

bot.on('message', message =>{
 
    let args = message.content.substring(PREFIX.length).split(' ')
 
    switch(args[0]){
        case 'mcserver':
 
            if(!args[1]) return message.channel.send('You must provide a minecraft server ip, like play.hypixel.net, etc.')
            if(!args[2]) return message.channel.send('You must provide a minecraft server port, it is usally 25565.')
 
            ping(args[1], parseInt(args[2]), (error, reponse) =>{
                if(error) throw error
                const Embed = new RichEmbed()
                message.channel.send('Minecraft Server Status')
                message.channel.send('Server IP:' + reponse.host + "")
                message.channel.send('Server Version' + reponse.version + "")
                message.channel.send('Online Players' + reponse.onlinePlayers + "")
                message.channel.send('Max Players' + reponse.maxPlayers + "")
               
                message.channel.send(Embed)
            })
        break
 
    }
 
})


bot.login(token)
