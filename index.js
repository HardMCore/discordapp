const Discord = require("discord.js");
const avconv = require("avconv");
const ffmpeg = require("ffmpeg-static");
const ytdl = require("ytdl-core");
const opusscript = require("opusscript");
const { getInfo } = require('ytdl-getinfo');

const client = new Discord.Client();

//Configuration files
const token = require('./token.json');
const commands = require('./commands.json');

//Global variables
var videourl;

//Logging in
client.login(token.DiscordToken);
client.once('ready', () => {
    console.log('Ready!');
});

//commands
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
            videourl = args[1];
            var validurl = ytdl.validateURL(videourl);

            if(validurl === false) {
                message.reply(commands.voiceerror);
            }
            else {
                const video = ytdl(videourl, {filter: 'audioonly'});

                const connection = await message.member.voice.channel.join();
                connection.play(video);
                ytdl(videourl).on('info', (info) => {
                    console.log(info.length_seconds);
                });
            }

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
            videourl = info.items[0].id;
            console.log(videourl);
            if (message.member.voice.channel) {
                const connection = await message.member.voice.channel.join();
                await videourl;
                const video = ytdl(videourl, { filter: 'audioonly' });
                connection.play(video);
                console.log(message.member.guild.me.voice.valueOf());
                ytdl(videourl).on('info', (info) => {
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
        message.member.guild.me.voice.kick();
    }
});
