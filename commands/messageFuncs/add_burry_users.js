const { Client, MessageEmbed } = require('discord.js');
const mysql = require('mysql');
const config = require('../../DTOM-config.json');

module.exports.run = async function(client, message, args, mysqlConnection, guildId){
	let speed = args[0];
	if (message.mentions.roles.size == 0 && !message.mentions.everyone){
		message.mentions.users.forEach((value, key) => {
			let iddd = `${key}` + "";
			mysqlConnection.query(`SELECT id FROM burr${message.guild.id} WHERE burry_users = ${iddd}`
				, function(err, results, fields){	
					if (results.length == 0){
						mysqlConnection.query(`INSERT INTO burr${message.guild.id} (burry_users) VALUES('${key}')`
							, function(err, results, fields){
							});
					}else{
					}			
			});
		})
		const embed = new MessageEmbed()
		    .setColor(config.hook_color.blue)
			.setDescription('Users have been added!');
		message.channel.send(embed);

	}else{
		const embed = new MessageEmbed()
		    .setColor(config.hook_color.red)
			.setDescription('Please, set only [users] in arguments');
		message.channel.send(embed);
	}
	

	
};
module.exports.info = {
	name: "addburryusers",
	event: "message"
};


/*IF NOT EXISTS ( SELECT 1 FROM Users WHERE FirstName = 'John' AND LastName = 'Smith' )
BEGIN
    INSERT INTO Users (FirstName, LastName) VALUES ('John', 'Smith')
END*/