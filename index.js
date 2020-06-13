const Discord = require("discord.js");
const avconv = require("avconv");
const ffmpeg = require("ffmpeg-static");
const ytdl = require("ytdl-core");
const opusscript = require("opusscript");
const { getInfo } = require('ytdl-getinfo');
const client = new Discord.Client();

client.login('NzIxMjg0Mjc1MDIyMDY5ODAw.XuSb7w.StFgogj_oLXm5Vm8393t0DMCc08');

client.once('ready', () => {
    console.log('Ready!');
    client.user.setActivity("your mom gay", {
        type: "STREAMING",
        url: "twitch.tv",
    });
});

client.on('message', async message => {
    if (!message.guild) return;

    if (message.content === '/join') {

        if (message.member.voice.channel) {
            const connection = await message.member.voice.channel.join();
            const url = 'https://www.youtube.com/watch?v=A8pOVirjGF0'
            const video = ytdl(url, { filter: 'audioonly' });
            connection.play(video);
            ytdl(url)
                .on('info', (info) => {
                    console.log(info.length_seconds);
                });
        } else {
            message.reply('Musisz być na kanale!');
        }
    }
});
