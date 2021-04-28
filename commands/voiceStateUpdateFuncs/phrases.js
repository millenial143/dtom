const Discord = module.require("discord.js");
const fs = require("fs");
const config = require('../../DTOM-config.json');
const discordTTS = require("discord-tts");

let delay = 500;
let cooldownCheck = true;

module.exports.run = async function(client, oldMember, newMember, mysqlConnection, guildId){


	

};
module.exports.info = {
	name: "phrases",
	event: "voiceStateUpdate"
};