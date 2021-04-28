const { Client, MessageEmbed } = require('discord.js');
const mysql = require('mysql');
const config = require('../../DTOM-config.json');


module.exports.run = async function(client, message, args, mysqlConnection, guildId){
	mysqlConnection.query(`SELECT bully_users FROM bull${message.guild.id}`, function(err, results, fields){
		let users = results;
		let usersList = '';
		for (let i = 0; i < users.length; i++){

			message.guild.members.fetch(users[i].bully_users)
				.then(value => {
					usersList = usersList + '\n' + value.user.username
				}).then(value => {
					if(i == users.length-1){
					//	message.channel.send('burry users list:\n ' + usersList);
						const embed = new MessageEmbed()
						  .setTitle('Burry users list:')
					      .setColor(config.hook_color.blue)
					      .setDescription(usersList);
					    message.channel.send(embed);
					}
					
				});
		}
		
	});
};
module.exports.info = {
	name: "bullinguserslist",
	event: "message"
};