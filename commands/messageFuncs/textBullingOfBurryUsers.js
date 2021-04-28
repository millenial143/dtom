const Discord = module.require("discord.js");
const fs = require("fs");
const config = require('../../DTOM-config.json');

module.exports.run = async function(client, message, args, mysqlConnection, guildId){
	mysqlConnection.query(`SELECT id FROM burr${message.guild.id} WHERE burry_users = ${message.author.id}`
		, function(err, results, fields){	
			if (results.length != 0){
				if (message.content.indexOf('р') != -1){
					message.channel.send(message.content.replace(/р/g, 'p̌'));				
				}
			}else{
			}			
	});
};
module.exports.info = {
	name: "textBullingOfBurryUsers",
	event: "message",
	allTime: true
};