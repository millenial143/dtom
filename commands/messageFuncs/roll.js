const Discord = require('discord.js');
const fs = require("fs");
const { Client, MessageEmbed } = require('discord.js');
const config = require('../../DTOM-config.json');

module.exports.run = async function(client, message, args){
	const embed = new MessageEmbed()
      .setColor(config.hook_color.blue);

   
    let num;
  	
    	if (args.length == 2){
	   		 num = Math.floor(Math.random() * (Number(args[1]) - Number(args[0])) + Number(args[0]));
		       
		}else if (args.length == 1){
		   	num = Math.floor(Math.random() * (0 - Number(args[0]))) + Number(args[0]);
		}
	    

	    let a1;
	    if (args[1]) {
	    	a1 = !Number.isInteger(Number(args[1]));
	    }

	    if (args.length == 0 || 
	    	args.length > 2  || 
	    	(args[0] - args[1]) > 0 || 
	    	typeof num != 'number' || 
	    	args < 0 || 
	    	num !== num || 
	    	!Number.isInteger(Number(args[0])) ||
	    	a1 
	    	){
	    	const eembed = new MessageEmbed()
	      		.setColor(config.hook_color.red)
	      		.setDescription('Please, set the correct arguments');
	      	message.channel.send(eembed);   
	    }else {
	    	embed.setDescription(num);
	   		message.channel.send(embed);
	    }

   
   
};
module.exports.info = {
	name: "roll",
	event: "message"
};