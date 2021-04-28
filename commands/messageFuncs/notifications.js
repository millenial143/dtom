const Discord = module.require("discord.js");
const { Client, MessageEmbed } = require('discord.js');
const config = require('../../DTOM-config.json');
const fs = require("fs");
const mysql = require('mysql');


module.exports.run = async function(client, message, args, mysqlConnection, guildId){
	const embed = new MessageEmbed()
      .setColor(config.hook_color.blue)
      
    
	if (args[0] == 'on'){
		mysqlConnection.query(`UPDATE global_config SET notification_mode = 1 WHERE gulid_id = '${guildId}'`, function(err, results, fields){});
		embed.setDescription('Notifications enabled');
		message.channel.send(embed);

	}else if(args[0] == 'off'){
		mysqlConnection.query(`UPDATE global_config SET notification_mode = 0 WHERE gulid_id = '${guildId}'`, function(err, results, fields){});
		embed.setDescription('Notifications disabled');
		message.channel.send(embed);
	}
};
module.exports.info = {
	name: "notifications",
	event: "message"
};