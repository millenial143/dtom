const { Client, MessageEmbed } = require('discord.js');
const mysql = require('mysql');
const config = require('../../DTOM-config.json');

module.exports.run = async function(client, message, args, mysqlConnection, guildId){
	let speed = args[0];
	if (speed <= 4 && speed >= 0.25){
		mysqlConnection.query(`UPDATE global_config SET tts_speed = ${speed} WHERE gulid_id = '${guildId}'`, function(err, results, fields){
			const embed = new MessageEmbed()
			    .setColor(config.hook_color.blue)
				.setDescription('TTS speed updated: ' + speed);
			message.channel.send(embed);
		});
		
	}
};
module.exports.info = {
	name: "ttsspeed",
	event: "message"
};