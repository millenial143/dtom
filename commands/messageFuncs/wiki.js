const Discord = require('discord.js');
const fs = require("fs");
const { Client, MessageEmbed } = require('discord.js');
const config = require('../../DTOM-config.json');
const wiki = require('wikijs').default;
 

module.exports.run = async function(client, message, args){
	let search = '';
	for (let i = 0; i < args.length; i++){
		search = search + args[i] + ' ';
	}; 

		let lan = 'en';
		if (message.guild.region == 'russia'){
			lan = 'ru';
		}
		wiki({ apiUrl: `https://${lan}.wikipedia.org/w/api.php` })
		    .page(search)
		  	.then(page => page.summary())
		    .then(info => {
		    	const embed = new MessageEmbed()
			      .setColor(config.hook_color.blue)
			      .setDescription(info);
			    message.channel.send(embed);
		    }).catch(reason => {
		    	let r = reason + '';
		    	if (r == 'Error: No article found'){
		    		const embed = new MessageEmbed()
					    .setColor(config.hook_color.red)
						.setDescription('No article found');
					message.channel.send(embed);
		    	}else{
					const embed = new MessageEmbed()
					    .setColor(config.hook_color.red)
						.setDescription('Unknown error');
					message.channel.send(embed);
		    	}
		    	
		    })

		
	
};
module.exports.info = {
	name: "wiki",
	event: "message"
};
