const Discord = module.require("discord.js");
const fs = require("fs");
const config = require('../../DTOM-config.json');
const baseFunc = require('../../modules/based-functions.js');

let check = 0;

module.exports.run = async function(client, guildMemberUpdate, newGuildMemberUpdate, mysqlConnection, guildId){
	let table_name = `lock${guildMemberUpdate.guild.id}user${guildMemberUpdate.id}`;
	let comp = baseFunc.array_compare(guildMemberUpdate._roles, newGuildMemberUpdate._roles);
	
	if (!comp && check == 0){
		mysqlConnection.query(`SELECT locked_roles FROM ${table_name}`, function(err, results, fields){	
			
			if (results){
				let arr = [];
				for(let i = 0; i < results.length; i++){
					arr[i] = results[i].locked_roles;
				}
				guildMemberUpdate.roles.add(arr);
				check++;
			}
		});
	}else{
		check = 0;
	}
		/*let yyyyy = JSON.parse(fs.readFileSync('C:/DTOM-bot/commands/guildMemberUpdateFuncs/locked-users.json', 'utf-8'));

		if ((Object.keys(yyyyy).includes(`${guildMemberUpdate}`)) && guildMemberUpdateCheck == 0){
			guildMemberUpdateCheck++;	
		}else if (guildMemberUpdate._roles.indexOf(config.lock_role_id) != -1 && guildMemberUpdateCheck == 0 ){
			if (newGuildMemberUpdate._roles.indexOf(config.lock_role_id) == -1 ){
			}else{
				guildMemberUpdateCheck++;	
				guildMemberUpdate.roles.add(guildMemberUpdate._roles);
			}
			
		}else{
			guildMemberUpdateCheck = 0;
		}*/
};
module.exports.info = {
	name: "lock-user",
	event: "guildMemberUpdate"
};