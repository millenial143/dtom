const Discord = module.require("discord.js");
const fs = require("fs");
const Canvas = require('canvas');
const drawFunc = require('../../modules/draw-functions.js');
const config = require('../../DTOM-config.json');


module.exports.run = async function(client, message, args){
	let background;
	let mes_arr = message.content.split(' ');

	if(mes_arr.length >= 2){
		let count = 0;
		let attachmentTo = drawFunc.getAttachment(message.channel.messages.cache);
		if(attachmentTo){
			background = await Canvas.loadImage(attachmentTo.attachment);
			
			let text = '';
			for (let i = 1; i < mes_arr.length; i++){
				text = text + ' ' + mes_arr[i];
			}

			const canvas = Canvas.createCanvas(600, 600);
			const ctx = canvas.getContext('2d');

			let dip = drawFunc.getBackgroundParams(background.width, background.height, canvas.width, canvas.height);
			ctx.drawImage(background, dip.sx, dip.sy, dip.sWidth, dip.sHeight, canvas.width*0.1,  canvas.height*0.05, canvas.width*0.8, canvas.height*0.8);
			{
				ctx.rect(0, 0, canvas.width*0.1, canvas.height);
				ctx.rect(0, 0, canvas.width, canvas.height*0.1);
				ctx.rect(canvas.width*0.9, 0, canvas.width, canvas.height);
				ctx.rect(0, canvas.height*0.8, canvas.width, canvas.height);
				ctx.fillStyle = 'black';
				ctx.fill();	
			}
			ctx.strokeStyle = "white";
			ctx.strokeRect(canvas.width*0.09, canvas.height*0.09, canvas.width*0.82, canvas.height*0.72);

			// Подгон размера текста
			let fontSize = 55;
			if (ctx.measureText(text).width*(55/12) > canvas.width*0.95){
				fontSize = 0.8*fontSize*(canvas.width*0.95)/(ctx.measureText(text).width* (55/12));
				if(fontSize > 200){
					fontSize = 200;
				}								
			};

			ctx.font = `${fontSize}px serif`;
			let textAfterChange = ctx.measureText(text).width;
			ctx.fillStyle = 'white';

			ctx.translate(canvas.width / 2, canvas.height*0.92);
			ctx.fillText(text, -textAfterChange/2, 0);
			const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'demotivator.png');
			message.channel.send(attachment);
			count++;	
		}else{
			message.channel.send('the last image was not found')
		}	
						
	}else{
		message.channel.send('demotivator command syntax: [prefix]demotivator [text]')
	}

			
		
}	


module.exports.info = {
	name: "demotivator",
	event: "message"
};