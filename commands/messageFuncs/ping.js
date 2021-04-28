const Discord = require('discord.js');
const fs = require("fs");
const { Client, MessageEmbed } = require('discord.js');
const config = require('../../DTOM-config.json');

module.exports.run = async function(client, message, args){
	const embed = new MessageEmbed()
      .setColor(config.hook_color.blue)
      .setDescription('Pong!');
    message.channel.send(embed);
};
module.exports.info = {
	name: "ping",
	event: "message"
};