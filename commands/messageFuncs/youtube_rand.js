const Discord = require('discord.js');
const fs = require("fs");
const { Client, MessageEmbed } = require('discord.js');
const config = require('../../DTOM-config.json');
const drawFunc = require('../../modules/draw-functions.js');
const { YoutubeDataAPI } = require("youtube-v3-api")
const API_KEY = 'AIzaSyAY5RgPtQLRH1hdovk4fMqBcFvbnmGkUog';
const api = new YoutubeDataAPI(API_KEY);
 

let getRandomStr = function(length){

	var result = '';
	var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var charactersLength = characters.length;
	for ( var i = 0; i < length; i++ ) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}

	//console.log(result)
	return result;

};




module.exports.run = async function(client, message, args){
	let str = getRandomStr(4);
	fetch("https://www.googleapis.com/youtube/v3/search?key=" + API_KEY + "&maxResults="+25+"&part=snippet&type=video&q=" + str/* "AAB4"*/)
            	//.then(console.log)
            	.then(function(response){
            		return response.text();
            	})
            	.then(resp => {
            	//	console.log(resp);
            		return JSON.parse(resp);
            	}).then(resp => {
            		if (resp.items.length > 0){
            			let count = drawFunc.getRandomInt(resp.items.length);
	            	//	console.log('https://www.youtube.com/watch?v=' + resp.items[count].id.videoId);
	            		const embed = new MessageEmbed()
					      .setColor(config.hook_color.blue)
					      .setDescription('https://www.youtube.com/watch?v=' + resp.items[count].id.videoId);
					    message.channel.send(embed);
            		}else{
            			const embed = new MessageEmbed()
					      .setColor(config.hook_color.red)
					      .setDescription('No video for you this time, try again');
					    message.channel.send(embed);
            		}

            	})
};
module.exports.info = {
	name: "youtuberand",
	event: "message"
};
