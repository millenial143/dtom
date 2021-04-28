const { Client, MessageEmbed } = require('discord.js');
const mysql = require('mysql');
const config = require('../../DTOM-config.json');


module.exports.run = async function(client, message, args, mysqlConnection, guildId){
	let speed = args[0];
		if (message.mentions.roles.size == 0 && !message.mentions.everyone){
		message.mentions.users.forEach((value, key) => {
			mysqlConnection.query(`DELETE FROM bull${message.guild.id} WHERE bully_users = '${key}'`, function(err, results, fields){
				
			});
		})
		const embed = new MessageEmbed()
		    .setColor(config.hook_color.blue)
			.setDescription('Users have been deleted!');
		message.channel.send(embed);
	}else{
		const embed = new MessageEmbed()
		    .setColor(config.hook_color.red)
			.setDescription('Please, set only [users] in arguments');
		message.channel.send(embed);
	}
};
module.exports.info = {
	name: "deletebullingusers",
	event: "message"
};