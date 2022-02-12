const Discord = require('discord.js');
require('dotenv').config()
const ytdl = require('ytdl-core');
const bot = new Discord.Client();
const streamOptions = {filter: 'audioonly'};

const token = process.env.SECRET_KEY;
const urlTiringa = 'https://www.youtube.com/watch?v=1Aw8aCVbQhc';

const prefixo = '?';

const servidores = {
    'server': {
        connection: null,
        dispatcher: null
    }
}

bot.on('ready', () => {
    console.log('Estou pronto pra ser usado!');
});

bot.on('message', async (msg) => {

    // filtros
    if (!msg.guild) return;

    if (!msg.content.startsWith(prefixo)) return;

    if (!msg.member.voice.channel) {
        msg.channel.send('Vai pra um canal homi!');
        return;
    }

    // COMANDOS 
    if (msg.content === prefixo + 'join') { // ?join
     servidores.server.connection = await msg.member.voice.channel.join();
    }

    if (msg.content === prefixo + 'tiringa') { // ?tiringa
        servidores.server.connection = await msg.member.voice.channel.join();
        servidores.server.connection.play(ytdl(urlTiringa, streamOptions));
       }

    if (msg.content === prefixo + 'leave') { // ?leave
       msg.member.voice.channel.leave();
       servidores.server.connection = null;
       }

    if (msg.content.startsWith(prefixo + 'play') ) { // ?play <link>
        const urlMusic = msg.content.slice(6);
        // const urlMusic = msg.content.split('');
        // console.log(urlMusic);

        if (ytdl.validateURL(urlMusic)) {
            servidores.server.connection = await msg.member.voice.channel.join();
            servidores.server.connection.play(ytdl(urlMusic, streamOptions));
        }
        else {
            msg.channel.send('Link Inválido!')
        }
       }
})

bot.login(token);