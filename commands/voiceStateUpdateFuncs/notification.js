const Discord = module.require("discord.js");
const fs = require("fs");
const config = require('../../DTOM-config.json');
const discordTTS = require("discord-tts");

let delay = 500;
let cooldownCheck = true;

module.exports.run = async function(client, oldMember, newMember, mysqlConnection, guildId){


		let leaveCheck = false;
		if (newMember.channel == null){
			leaveCheck = true;
		};

	    if((oldMember.channel != newMember.channel) && newMember.channel != null && leaveCheck == false){
	    	if(oldMember.id != '705786467640803358' && cooldownCheck){
	    		let DBData;
	    		mysqlConnection.query(`SELECT notification_phrase1, notification_mode, tts_lang, tts_speed FROM global_config WHERE gulid_id = '${guildId}'`, function(err, results, fields){
					if (results){
						DBData = results[0];	
					}
					
					if (!DBData){
						return
					}
					if(DBData.notification_mode == 1){
						cooldownCheck = false;
			    		setTimeout(function(){
			    			cooldownCheck = true;
			    		}, delay);
				        const channel = newMember.channel;
				        channel.join().then(connection => {
				            const stream = discordTTS.getVoiceStream(newMember.member.user.username + DBData.notification_phrase1, DBData.tts_lang, DBData.tts_speed);
				            const dispatcher = connection.play(stream);
				            dispatcher.on("finish",()=>	channel.leave())
				        });
					};    			
				});

	    		
		    }
	    }else{
	    	if(leaveCheck && oldMember.id != '705786467640803358' && cooldownCheck){
	    		let DBData;
	    		mysqlConnection.query(`SELECT notification_phrase2, notification_mode, tts_lang, tts_speed FROM global_config WHERE gulid_id = '${guildId}'`, function(err, results, fields){
					if (results){
						DBData = results[0];	
					}
					if (!DBData){
						return
					}
					if(DBData.notification_mode == 1){
						cooldownCheck = false;
			    		setTimeout(function(){
			    			cooldownCheck = true;
			    		}, delay);
				    	const channel = oldMember.channel;
				        channel.join().then(connection => {
				            const stream = discordTTS.getVoiceStream(newMember.member.user.username + DBData.notification_phrase2, DBData.tts_lang, DBData.tts_speed);
				            const dispatcher = connection.play(stream);
				            dispatcher.on("finish",()=>	channel.leave())
				        });
					}; 
		    		
				});
				

	    	}    	
	    }

};
module.exports.info = {
	name: "lockUser",
	event: "voiceStateUpdate"
};