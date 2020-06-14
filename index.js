const Discord = require("discord.js");
const avconv = require("avconv");
const ffmpeg = require("ffmpeg-static");
const ytdl = require("ytdl-core");
const opusscript = require("opusscript");
const { getInfo } = require('ytdl-getinfo')
const fs = require('fs');

const client = new Discord.Client();

var token = JSON.parse(fs.readFileSync('token.json'));

client.login(token.DiscordToken);

client.once('ready', () => {
    console.log('Ready!');
});

client.on('message', async message => {
    if (!message.guild) return;
    var playcmd = "/play"
    if (message.content.startsWith(playcmd)) {
        const args = message.content.slice(playcmd.length).split(' ');
        console.log(args[1])
        if (args[1] === undefined) {
            message.reply('Podaj link piosenki! (/play [link])');
            return;
        }
        if (message.member.voice.channel) {
            const connection = await message.member.voice.channel.join();
            const url = args[1];
            const video = ytdl(url, {filter: 'audioonly'});
            connection.play(video);
            ytdl(url).on('info', (info) => {
                console.log(info.length_seconds);
            });
        } else {
            message.reply('Musisz być na kanale!');
        }
    }
});

client.on('message', async message => {
    if (!message.guild) return;
    var searchcmd = "/search"
    if (message.content.startsWith(searchcmd)) {
        const args = message.content.slice(searchcmd.length);
        if (args === undefined){
            message.reply('Podaj nazwę piosenki! (/search [nazwa])');
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
            } else {
                message.reply('Musisz być na kanale!');
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
