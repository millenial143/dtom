const { Client, MessageEmbed } = require('discord.js');
const mysql = require('mysql');
const config = require('../../DTOM-config.json');

module.exports.run = async function(client, message, args, mysqlConnection, guildId){
	let lang = args[0];
	if (lang == 'en'||
		lang == 'ru'||
		lang == 'bg'||
		lang == 'es'||
		lang == 'el'||
		lang == 'fr'||
		lang == 'sw'||
		lang == 'ka'||
		lang == 'ar'){
		mysqlConnection.query(`UPDATE global_config SET tts_lang = '${lang}' WHERE gulid_id = '${guildId}'`, function(err, results, fields){});

		const embed = new MessageEmbed()
		    .setColor(config.hook_color.blue)
			.setDescription('TTS lang updated: ' + lang);
		message.channel.send(embed);
	}else{
		const embed = new MessageEmbed()
		    .setColor(config.hook_color.red)
			.setDescription('No such language exists: ' + lang);
		message.channel.send(embed);
	}
};
module.exports.info = {
	name: "ttslang",
	event: "message"
};