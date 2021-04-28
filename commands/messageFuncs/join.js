const Discord = module.require("discord.js");
const fs = require("fs");
const Canvas = require('canvas');
const drawFunc = require('../../modules/draw-functions.js');
const config = require('../../DTOM-config.json');
const { registerFont, createCanvas } = require('canvas');


let phrases_array = []

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

fs.readdir(config.hello_mp3_files, (err, files) => {	
	files.forEach(file => {
	 	phrases_array.push(file);
	})
})

module.exports.run = async function(client, message, args){

		if (message.member.voice.channel) {
			connection = await message.member.voice.channel.join();
			//Издавание звука при подключении
			setTimeout(function(){
				let dispatcher = connection.play(config.hello_mp3_files + '/' + phrases_array[getRandomInt(phrases_array.length)]);
				dispatcher.on('error', console.error);
				dispatcher.on('start', () => {
					//console.log('audio.mp3 is now playing!');
				});

				dispatcher.on('finish', () => {
					//console.log('audio.mp3 has finished playing!');
				});
			},800);
		}
		
		
}

module.exports.info = {
	name: "join",
	event: "message"
};