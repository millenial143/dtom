const Discord = require('discord.js');
const Canvas = require('canvas');
const config = require('./DTOM-config.json');
const fs = require('fs');
const discordTTS = require("discord-tts");
const drawFunc = require('./modules/draw-functions.js');
const DBFunc = require('./modules/data-base-functions.js');
const cliProgress = require('cli-progress');



//import wiki from 'wikijs';

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}



const mysql = require('mysql');
const mysqlConnection = mysql.createConnection({
	host: "localhost",
	user: "root",
	database: "DTOM_bot",
	password: "root"
});

setInterval(function(){
	mysqlConnection.query("SELECT * FROM `global_config`", function(err, results, fields){});
}, 20000);


const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
bar.start(4, 0);
console.log('\n\n')

const client = new Discord.Client();
client.commands = new Discord.Collection();

let lastDate = Date.now();
let connection;


let app = require('express')();


let phrases_array = [];


const phrasesFolder = 'mp3_files/phrases';
const inscriptionFolder = 'inscription-styles';

client.once('ready', () => {

	fs.readdir(phrasesFolder, (err, files) => {
	  files.forEach(file => {
	    phrases_array.push(file);
	  });
	})
	console.log('DTOM-BOT is online');
	client.generateInvite(["ADMINISTRATOR", 'CREATE_INSTANT_INVITE', 'KICK_MEMBERS', 'BAN_MEMBERS', 
		'MANAGE_CHANNELS', 'MANAGE_GUILD', 'ADD_REACTIONS', 'VIEW_AUDIT_LOG', 'PRIORITY_SPEAKER',
		'STREAM', 'VIEW_CHANNEL', 'SEND_MESSAGES', 'SEND_TTS_MESSAGES', 'MANAGE_MESSAGES', 
		'EMBED_LINKS', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'MENTION_EVERYONE']).then(link =>{
		console.log(link + '\n\n')
	})
});


//Подключение комманд
fs.readdir('./commands', (err, files)=>{

	let cmdFiles = files.filter(f => f.split(".").pop() == "js");
	let folders = files.filter(f => f.indexOf(".") == -1);

	folders.forEach(filele => {
		fs.readdir(`./commands/${filele}`, (err, fileses) => {
			cmdFileses = fileses.filter(f => f.split(".").pop() == "js");
			if(fileses){
				cmdFileses.forEach(file => {
					let req = require(`./commands/${filele}/${file}`);
					console.log('Command ' + file + ' loaded');
					client.commands.set(req.info.name + req.info.event, req);
				})	
			}else{
				console.log('folder is empty')
			}
			
		})
	})

	if (folders.length <= 0){
		console.log("missing commands");
	};
})



client.on('message', message =>{

	/*if(message.author.client){
		return
	};
	if(message.channel.type == "dm"){
		return
	};*/
	//console.log(message.member.id)
	if(message.guild != null){
		let guildId = message.guild.id;
		let SQLQuery = `SELECT prefix FROM global_config WHERE gulid_id = '${guildId}'`;
		mysqlConnection.query(SQLQuery, function(err, results, fields){
			//console.log(results)

			if (results.length == 0){
				DBFunc.createDBServerRow(mysqlConnection, message.guild, guildId);
				DBFunc.createDBServerTable(mysqlConnection, message.guild, guildId);
				return;
			}

			let prefix = results[0].prefix;
			let username =  message.author.username;
			let userId = message.author.id;
			let messageArray = message.content.split(" ");
			let command = messageArray[0];
			let args = messageArray.slice(1);

			if (message.content[0] == prefix){

				let cmd = client.commands.get(command.slice(prefix.length) + 'message');
				if (cmd && message.member.id != '705786467640803358'){
					cmd.run(client, message, args, mysqlConnection, guildId);
				}
			}
			client.commands.forEach(function(cmd){
				if (cmd.info.allTime){
					if (cmd.info.allTime == true){			
						cmd.run(client, message, args, mysqlConnection, guildId);
					}
				}
			});	
		});	
	}
	
});

client.on('guildMemberUpdate', (guildMemberUpdate, newGuildMemberUpdate) =>{
	console.log('guildMemberUpdate')
	client.commands.forEach(function(cmd){
		if (cmd.info.event == 'guildMemberUpdate'){
			cmd.run(client, guildMemberUpdate, newGuildMemberUpdate, mysqlConnection, guildMemberUpdate.guild.id);
		}
	});
});


client.on('voiceStateUpdate', (guildMemberUpdate, newGuildMemberUpdate) =>{
	client.commands.forEach(function(cmd){
		if (cmd.info.event == 'voiceStateUpdate'){
			cmd.run(client, guildMemberUpdate, newGuildMemberUpdate, mysqlConnection, guildMemberUpdate.guild.id);
		}
	});
});


client.on("guildCreate", (guild) => {
    DBFunc.createDBServerRow(mysqlConnection, guild, guild.id);
    DBFunc.createDBServerTable(mysqlConnection, guild, guild.id);
});

  // when the client is removed from servers
client.on("guildDelete", (guild) => {
  	DBFunc.deleteDBServerRow(mysqlConnection, guild, guild.id);
  	DBFunc.deleteDBServerTable(mysqlConnection, guild, guild.id);
});


// Говорит кринж
client.on("guildMemberSpeaking", function(member, speaking){

	if (speaking.bitfield == 0 ){

		mysqlConnection.query(`SELECT id FROM bull${member.guild.id} WHERE bully_users = ${member.id}`
			, function(err, results, fields){	
				if (results.length != 0){
					//console.log('bulling_user is speaking')
					member.guild.members.fetch('705786467640803358')
						.then(function(mem){
								if ((Date.now() - lastDate) >= 2600){
								let dispatcher = mem.voice.connection.play(config.phrases_mp3_files + '/' + phrases_array[getRandomInt(phrases_array.length)]);
								dispatcher.on('error', console.error);
								dispatcher.on('error', console.error);
								
							    lastDate = Date.now();
							}
					
						})
						
				}else{
				}			
			});		
	};
});





client.login(config.token);