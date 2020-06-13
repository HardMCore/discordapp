const Discord = require("discord.js");
const client = new Discord.Client();

client.once('ready', () => {
    console.log('Ready!');
});

client.login('NzIxMjg0Mjc1MDIyMDY5ODAw.XuSb7w.StFgogj_oLXm5Vm8393t0DMCc08');
client.on('message', message => {
    console.log(message.content + Discord.);
});