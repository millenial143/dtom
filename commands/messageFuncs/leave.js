const Discord = module.require("discord.js");
const fs = require("fs");
const Canvas = require('canvas');
const drawFunc = require('../../modules/draw-functions.js');
const config = require('../../DTOM-config.json');
const { registerFont, createCanvas } = require('canvas');



module.exports.run = async function(client, message, args){

		if (message.member.voice.channel) {
			message.member.voice.channel.leave();
			//Издавание звука при подключении
			
		}
		
		
}

module.exports.info = {
	name: "leave",
	event: "message"
};