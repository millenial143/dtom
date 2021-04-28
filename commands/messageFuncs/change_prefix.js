const { Client, MessageEmbed } = require('discord.js');
const mysql = require('mysql');
const config = require('../../DTOM-config.json');


module.exports.run = async function(client, message, args, mysqlConnection, guildId){
	let newPrefix = args[0];
	if (newPrefix.length != 1 || args.length != 1){
		const embed = new MessageEmbed()
		    .setColor(config.hook_color.red)
			.setDescription('Please, set correct arguments');
		message.channel.send(embed);
	}else{

		mysqlConnection.query(`UPDATE global_config SET prefix = '${newPrefix}' WHERE gulid_id = '${guildId}'`, function(err, results, fields){
				
		});

		const embed = new MessageEmbed()
		    .setColor(config.hook_color.blue)
			.setDescription('Prefix updated: ' + newPrefix);
		message.channel.send(embed);
	}


};
module.exports.info = {
	name: "changeprefix",
	event: "message"
};