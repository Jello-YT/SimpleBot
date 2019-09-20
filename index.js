// © 2019 Fraffel Media. SimpleBot is created by FAXES (FAXES#8655). View the license!
const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

// Bot startup
console.log("Setting up SimpleBot. this might take a few seconds!")
fs.readdir("./commands/", (err, files) => {
    if(err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log('\x1b[31m%s\x1b[0m', "Could not folder commands.");
        return;
    }

    jsfile.forEach((f, i) =>{
        let props = require(`./commands/${f}`);
        if(botconfig["bot_setup"].debug_mode) {
            console.log(`${f} loaded!`);
        }
        bot.commands.set(props.help.name, props);
        bot.commands.set(props.help.name2, props);
        bot.commands.set(props.help.name3, props);
    });
});

if(botconfig["module_toggles"].utility_commands) {
    fs.readdir("./commands/utility_module/", (err, files) => {
        if(err) console.log(err);
        let jsfile = files.filter(f => f.split(".").pop() === "js")
        if(jsfile.length <= 0){
            console.log('\x1b[31m%s\x1b[0m', "Could not folder utility_module.");
            return;
        }

        jsfile.forEach((f, i) =>{
            let props = require(`./commands/utility_module/${f}`);
            if(botconfig["bot_setup"].debug_mode) {
                console.log(`${f} loaded!`);
            }
            bot.commands.set(props.help.name, props);
        });
        console.log('\x1b[36m%s\x1b[0m', "- Utility Module Loaded!")
    });
}

if(botconfig["module_toggles"].giveaway_module) {
    fs.readdir("./commands/giveaway_module/", (err, files) => {
        if(err) console.log(err);
        let jsfile = files.filter(f => f.split(".").pop() === "js")
        if(jsfile.length <= 0){
            console.log('\x1b[31m%s\x1b[0m', "Could not folder giveaway_module.");
            return;
        }

        jsfile.forEach((f, i) =>{
            let props = require(`./commands/giveaway_module/${f}`);
            if(botconfig["bot_setup"].debug_mode) {
                console.log(`${f} loaded!`);
            }
            bot.commands.set(props.help.name, props);
        });
        console.log('\x1b[36m%s\x1b[0m', "- Utility Module Loaded!")
    });
}

bot.on('error', console.error);
bot.on("ready", async () => {
    console.log('\x1b[32m%s\x1b[0m', `SimpleBot is online and set up! I'm on ${bot.guilds.size} servers.`);
    bot.user.setActivity(botconfig["bot_setup"].bot_game, {type: botconfig["bot_setup"].bot_game_type});
    bot.user.setStatus(botconfig["bot_setup"].bot_status)

    // DO NOT EDIT THE BELOW, THIS IS FOR PERFORMANCE AND STATISTICS. EDITING THIS IS A VIOLATION OF LICENSE [START NO EDIT]
    var express = require('express');
    var app = express();
    let webHookUrl = "https://hooks.zapier.com/hooks/catch/4795191/vi5vc8/"
    let webHookData = `{
        name: "Client_Name",
        purchaseID: "Order_ID",
        mod_module: botconfig["module_toggles"].moderation_commands.toString(),
        utility_module: botconfig["module_toggles"].utility_commands.toString(),
        log_module: botconfig["module_toggles"].logs.toString(),
        mod_log_module: botconfig["module_toggles"].mod_logs.toString(),
        ticket_module: botconfig["module_toggles"].ticket_system.toString(),
        Filter_module: botconfig["module_toggles"].filter_lang_links.toString(),
        bot_prefix: botconfig["bot_setup"].prefix.toString(),
        debug_mode: botconfig["bot_setup"].debug_mode.toString()
    }`
    app.post(webHookUrl, function(req, res) {
        req.type('json');
        req.json(webHookData);
        req.end();
    });
    console.log(`Performance & Statistics Check Made. Status: Complete`)
    // [END NO EDIT]
});

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let prefix = botconfig["bot_setup"].prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLowerCase();
    let args = messageArray.slice(1);
    if (!message.content.startsWith(prefix)) return;
    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot, message, args);
});


// Welcome message
bot.on('guildMemberAdd', member => {
    if(botconfig["module_toggles"].join_role) {
        var role = member.guild.roles.find(role => role.id === botconfig["join_roles"].role);
        if (!role) return console.log("role not found (Config: 'role')");
        member.addRole(role);
    }
    if(botconfig["module_toggles"].welcome_leave_channel) {
        const channel = member.guild.channels.find(channel => channel.id === botconfig["channel_setup"].welcome_channel);
        if (!channel) return console.log("join channel not found (Config: 'welcome_channel')");

        if(botconfig["welcome_leave_channel_settings"].use_embed) {
            let botEmbed = new Discord.RichEmbed()
                .setDescription(`**${member} (${member.user.tag})** joined.`)
                .setColor("#77ff72")     
            channel.send(botEmbed);
        } else {
            channel.send(`**${member} (${member.user.tag})** joined.`);
        }
    }
    // Member count channel update
    if(botconfig["module_toggles"].member_count_channel) {
        member.guild.channels.find(channel => channel.id === botconfig["channel_setup"].member_count_channel).setName(`Member Count: ${member.guild.memberCount}`);
    }
});

// Leave Message
bot.on('guildMemberRemove', member => {
    if(botconfig["module_toggles"].welcome_leave_channel) {
        const channel = member.guild.channels.find(channel => channel.id === botconfig["channel_setup"].welcome_channel);
        if (!channel) return console.log("leave channel not found (Config: 'welcome_channel')");
        channel.send(`${member} (${member.user.tag})** left.`);
    }

    if(botconfig["welcome_leave_channel_settings"].use_embed) {
        let botEmbed = new Discord.RichEmbed()
            .setDescription(`**${member} (${member.user.tag})** left.`)
            .setColor("#e55b5b")     
        channel.send(botEmbed);
    } else {
        channel.send(`**${member} (${member.user.tag})** left.`);
    }
    // Member count channel update
    if(botconfig["module_toggles"].member_count_channel) {
        member.guild.channels.find(channel => channel.id === botconfig["channel_setup"].member_count_channel).setName(`Member Count: ${member.guild.memberCount}`);
    }
});

bot.login(botconfig["bot_setup"].token);