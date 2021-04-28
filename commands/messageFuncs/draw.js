const Discord = module.require("discord.js");
const fs = require("fs");
const Canvas = require('canvas');
const drawFunc = require('../../modules/draw-functions.js');
const config = require('../../DTOM-config.json');
const { registerFont, createCanvas } = require('canvas');

const inscriptionFolder = config.commands.draw.inscriptionFolder;

let styles_object = {};
let backgrounds_object = {};



// Составление списка шрифтов и фонов
fs.readdir(inscriptionFolder, (err, files) => {
	let styles_array = [];
	files.forEach(file => {
		styles_array.push(file);
	});

	let k = 0;
	let j = 0;

	let fonts = [];
	for (i = 0; i < styles_array.length; i++){
	  	let pathOfFonts = `${inscriptionFolder}/`+styles_array[i]+`/fonts`;
		fs.readdir(`${inscriptionFolder}/`+styles_array[i]+`/fonts`, (err, files) => {			
			files.forEach((file ) => {
			    registerFont(pathOfFonts + '/'+file, { family: `font${j}` });
			    styles_object[pathOfFonts + '/'+file] = `font${j}`;
			    j++	
			});
		});

		let pathOfBackgrounds = `${inscriptionFolder}/`+styles_array[i]+`/backgrounds`;
		fs.readdir(`${inscriptionFolder}/`+styles_array[i]+`/backgrounds`, (err, files) => {			
			files.forEach((file) => {
			  	backgrounds_object[pathOfBackgrounds + '/'+file] = `backgrounds${k}`;
			  	k++
			});
		});
	}
})

/*setTimeout(function(){
	console.log(styles_object);
	console.log(backgrounds_object);
}, 3000)*/

module.exports.run = async function(client, message, args){
	
	let background;
	let mes_arr = message.content.split(' ');
	if(mes_arr.length >= 3){
		
		let theme = mes_arr[1];
		let text = '';
		for (let i = 2; i < mes_arr.length; i++){
			text = text + ' ' + mes_arr[i];
		}

		let fontSize = 55;
		let picConfig;	
		try{
			picConfig = JSON.parse(fs.readFileSync(`./inscription-styles/${theme}/style-config.json`, 'utf-8'));
		}catch{
			message.channel.send(`style "${theme}" is not exist`)
		}
			
		let backgroundsArr = drawFunc.getBackgrounds(theme, backgrounds_object, inscriptionFolder);
		background = await Canvas.loadImage(backgroundsArr[drawFunc.getRandomInt(backgroundsArr.length)]);

		const canvas = Canvas.createCanvas(900, 600);
		const ctx = canvas.getContext('2d');

		// Подгон размера текста
		if (ctx.measureText(text).width*(55/12) < canvas.width*0.8){
			fontSize = 0.8*fontSize*(1/ ((ctx.measureText(text).width* (55/12))/(canvas.width*0.8)));
			if(fontSize > 200){
				fontSize = 200;
			}		
		};

		let takiColor = drawFunc.randColor();
		ctx.rect(0, 0, 900, 600);
		ctx.fillStyle = "black";
		ctx.fill();
			
		let dip = drawFunc.getBackgroundParams(background.width, background.height, canvas.width, canvas.height);
		ctx.drawImage(background, dip.sx, dip.sy, dip.sWidth, dip.sHeight, 0, 0, canvas.width, canvas.height);

		// Наложение фильтра
		if (picConfig.filter.exist){
			ctx.rect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height);
			ctx.fillStyle = picConfig.filter.color;
			ctx.globalAlpha = picConfig.filter.brightness * 0.01;
			ctx.fill();			
		}

		ctx.globalAlpha = 1;

		let picFont;
		let fontsArr = drawFunc.getFonts(theme,styles_object, inscriptionFolder);
		picFont = styles_object[fontsArr[drawFunc.getRandomInt(fontsArr.length)]];

		let picColor = picConfig.colors[drawFunc.getRandomInt(picConfig.colors.length)];

		// Рисование свечение
		if(picConfig.glow.exist){
			ctx.shadowColor = picColor;
		    ctx.shadowBlur = 10;
		    ctx.shadowOffsetX = 0;
		    ctx.shadowOffsetY = 0;
		}
			
		ctx.font = `${fontSize}px ${picFont}`;

		ctx.fillStyle = picColor;

		let mainLines = drawFunc.getLines(ctx, text, canvas.width*0.8);

		// Рисование градиента на всей надписи
		if (picConfig.gradient.exist){
			if (picConfig.gradient.exist){
				let gradient = ctx.createLinearGradient(0, -fontSize*mainLines.length, 0, fontSize*mainLines.length);
				for (let i = 0; i < picConfig.gradient.gradients.length; i++){
					let grad = picConfig.gradient.gradients[i].split(' ');
					gradient.addColorStop(Number(grad[1]), grad[0]);
				}
				ctx.fillStyle = gradient;	
			}			
		}
		
		let randInt = (drawFunc.getRandomInt(20)-10)*0.01;
		ctx.translate(canvas.width / 2, canvas.height / 2);

		// Поворот текста
		if (picConfig.rotation == true){
			ctx.rotate(randInt* Math.PI);
		};
			
		let textAfterChange = ctx.measureText(text).width;

		for(let i = 0; i < mainLines.length; i++){
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			// Рисование градиента на каждой линии
			if ( picConfig.gradient.forEachLine && picConfig.gradient.exist){
				let space = fontSize*(i - (mainLines.length - 1)/2);
				let gradient = ctx.createLinearGradient(0, space - fontSize/2, 0, space + fontSize/2);
				for (let i = 0; i < picConfig.gradient.gradients.length; i++){
					let grad = picConfig.gradient.gradients[i].split(' ');
					gradient.addColorStop(Number(grad[1]), grad[0]);
				}
				ctx.fillStyle = gradient;	
			}

			if (mainLines.length == 1){				
				ctx.fillText(mainLines[i], -(1/textAfterChange)*15000, 0);
			}else{
				ctx.fillText(mainLines[i], 0, fontSize*(i + 0.5 - mainLines.length/2));
			}

			// Рисование обводки
			if(picConfig.stroke.exist){
				ctx.strokeStyle = picConfig.stroke.color;

				if(picConfig.stroke.lineWidth){
					ctx.lineWidth = picConfig.stroke.lineWidth;
				}else{
					ctx.lineWidth = 3;
				}
					
				if (mainLines.length == 1){			
					ctx.strokeText(mainLines[i], -(1/textAfterChange)*15000, 0);
				}else{
					ctx.strokeText(mainLines[i], 0, fontSize*(i + 0.5 - mainLines.length/2));
				}
			}
		};
		const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'pic.png');
		message.channel.send(attachment);
	}else{
		message.channel.send('draw command syntax: '+config.prefix+'draw [style] [text]');
	}
		
}

module.exports.info = {
	name: "draw",
	event: "message"
};