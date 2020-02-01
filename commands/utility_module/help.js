const Discord = require("discord.js")
const { Client, RichEmbed } = require('discord.js');
module.exports.run = async (bot, message, args) => {
    const embed = new RichEmbed()
    .setTitle('**Simple Bot Commands**')
    .setColor(0xFF0000)
    .setDescription('`.ban` Bans a member. `.kick` Kicks a member. `.ping` shows the ping of the bot. `.say` Sends a message as the bot. `.sayem` Sends an Embeded message as the bot. `.timer` starts a timer for you. `.uptime` shows the uptime of the bot.')
    .setTimestamp()
    message.channel.send(embed);
}
module.exports.help = {
    name: "help"
}