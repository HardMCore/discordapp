const Discord = require("discord.js");
const avconv = require("avconv");
const ffmpeg = require("ffmpeg-static");
const ytdl = require("ytdl-core");
const opusscript = require("opusscript");
const { getInfo } = require('ytdl-getinfo')

const client = new Discord.Client();

var token = require('./token.json')
var commands = require('./commands.json')

client.login(token.DiscordToken);

client.once('ready', () => {
    console.log('Ready!');
});

client.on('message', async message => {
    if (!message.guild) return;
    var playcmd = commands.play.command;
    if (message.content.startsWith(playcmd)) {
        const args = message.content.slice(playcmd.length).split(' ');
        if (args[1] === undefined) {
            message.reply(commands.play.howto);
            return;
        }
        if (message.member.voice.channel) {
            const url = args[1];
            var validurl = ytdl.validateURL(url);

            console.log(validurl);

            if(validurl === false) {
                message.reply(commands.voiceerror);
                return;
            }

            const video = ytdl(url, {filter: 'audioonly'});

            const connection = await message.member.voice.channel.join();
            connection.play(video);
            ytdl(url).on('info', (info) => {
                console.log(info.length_seconds);
            });
        } else {
            message.reply(commands.mustbe);
        }
    }
});

client.on('message', async message => {
    if (!message.guild) return;
    var searchcmd = commands.search.command
    if (message.content.startsWith(searchcmd)) {
        const args = message.content.slice(searchcmd.length);
        if (args === undefined){
            message.reply(commands.search.howto);
            return;
        }
        getInfo(args).then(async info => {
            const url = info.items[0].id;
            console.log(url);
            if (message.member.voice.channel) {
                const connection = await message.member.voice.channel.join();
                await url;
                const video = ytdl(url, { filter: 'audioonly' });
                connection.play(video);
                ytdl(url).on('info', (info) => {
                    console.log(info.length_seconds);
                });
            }
            else {
                message.reply(commands.mustbe);
            }
        })

    }
});


client.on('message', async message => {
    if (!message.guild) return;
    var stopcmd = "/stop"
    if (message.content.startsWith(stopcmd)) {
        console.log("leavin");
        message.member.guild.me.voice.kick();
    }
});

client.on('message', async message => {
    if (!message.guild) return;
    var stopcmd = "/stop"
    if (message.content.startsWith(stopcmd)) {