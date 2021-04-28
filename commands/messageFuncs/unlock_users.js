const { Client, MessageEmbed } = require('discord.js');
const mysql = require('mysql');
const config = require('../../DTOM-config.json');

module.exports.run = async function(client, message, args, mysqlConnection, guildId){
	if (message.mentions.roles.size == 0 && !message.mentions.everyone){
		message.mentions.members.forEach((value, key) => {
			let table_name = `lock${message.guild.id}user${key}`;
			mysqlConnection.query(`DROP TABLE ${table_name}`, function(err, results, fields){	
				
			});
		})

		const embed = new MessageEmbed()
		    .setColor(config.hook_color.blue)
			.setDescription('Users have been unlocked!');
		message.channel.send(embed);
	}else{
		const embed = new MessageEmbed()
		    .setColor(config.hook_color.red)
			.setDescription('Please, set only [users] in arguments');
		message.channel.send(embed);
	}	
};
module.exports.info = {
	name: "unlockusers",
	event: "message"
};