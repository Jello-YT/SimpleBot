const Discord = require("discord.js")
module.exports.run = async (bot, message, args) => {
    if (!message.guild) return;
    const user = message.mentions.users.first();
    if (user) {
        const member = message.guild.member(user);
        if (member) {
            member.kick('No Reason').then(() => {
                message.reply(`Successfully kicked ${user.tag}`);
            }).catch(err => {
                message.reply('I was unable to kick the member');
                console.error(err);
            });
        } else {
            message.reply('That user isn\'t in this guild!');
        }
    } else {
        message.reply('You didn\'t mention the user to kick!');
    }
}

module.exports.help = {
    name: "kick"
}
  