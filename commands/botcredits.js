// REMOVING OR EDITING THIS FILE IS A BREACH OF THE LICENSE. LEAVE IT AS IS AND DON'T DISABLE IT! [START NO EDIT]
// © 2019 Fraffel Media. MultiBot is created by FAXES (FAXES#8655). View the license!
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
    .addField("Credits", `This bot is made by FAXES#8655`)
    .addField("Information", `This bot (SimpleBot) was created by FAXES and is a packaged bot which you can obtain via the FAXES Gaming Discord. This bot comes with a license which is agreed to by the product purchaser. \nhttps://faxes.zone/discord`);

    message.channel.send(botembed).then(msg => msg.delete(60000));
}

module.exports.help = {
    name: "botcredits",
    name2: "credits",
    name3: "simplebot"
}
// REMOVING OR EDITING THIS FILE IS A BREACH OF THE LICENSE. LEAVE IT AS IS AND DON'T DISABLE IT! [END NO EDIT]