const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
    message.delete();
    let botembed = new Discord.RichEmbed()
    .setDescription("SimpleBot Information")
    .setColor(botconfig["bot_setup"].main_embed_color)
    .setThumbnail("https://faxes.zone/bots/assets/images/image05.png")
    .addField("Bot Name", `${bot.user.username} / Original Name: SimpleBot`)
    .addField("Servers", bot.guilds.size)
    .addField("Credits", `This bot is made by FAXES#8655 and JelloYT#7051`)
    .addField("Information", `This bot (SimpleBot) was created by FAXES and JelloYT. It is a public bot which can be optained by going to https://github.com/Jello-YT/SimpleBot .`);
}

module.exports.help = {
    name2: "credits",
}