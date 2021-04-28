const { Client, MessageEmbed } = require('discord.js');
const mysql = require('mysql');
const config = require('../../DTOM-config.json');



module.exports.run = async function(client, message, args, mysqlConnection, guildId){
	if (message.mentions.roles.size == 0 && !message.mentions.everyone){
		message.mentions.members.forEach((value, key) => {
			let table_name = `lock${message.guild.id}user${key}`;

				mysqlConnection.query(`CREATE TABLE IF NOT EXISTS ${table_name}(id int(10) AUTO_INCREMENT PRIMARY KEY, locked_roles varchar(18))`
					, function(err, results, fields){	

						let roles = value._roles;
						for (let i = 0; i < roles.length; i++){
							mysqlConnection.query(`INSERT INTO ${table_name} (locked_roles) VALUES('${roles[i]}')`
								, function(err, results, fields){	
									
							});
						}
				});
		})
	}else{
		const embed = new MessageEmbed()
		    .setColor(config.hook_color.red)
			.setDescription('Please, set only [users] in arguments');
		message.channel.send(embed);
	}	

	const embed = new MessageEmbed()
	    .setColor(config.hook_color.blue)
		.setDescription('Users have been locked!');
	message.channel.send(embed);
};
module.exports.info = {
	name: "lockusers",
	event: "message"
};