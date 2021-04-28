

module.exports = {
	getRandomInt: function(max) {
		return Math.floor(Math.random() * Math.floor(max));
	},
	
	getAttachment: function (cacheMessagesArray) {
    	let attachmentsArray = [];
	    for (let i of cacheMessagesArray){
			for (let j of i[1].attachments){
			//	console.log(j[1]);
				attachmentsArray.push(j[1]);
			}
		}
		return attachmentsArray[attachmentsArray.length - 1];
	},
	
    randColor: function () {
	    r = Math.floor(Math.random() * (256));
	    g = Math.floor(Math.random() * (256));
	    b = Math.floor(Math.random() * (256));

	    r2 = 256 - Math.floor(Math.random() * (256));
	    g2 = 256 - Math.floor(Math.random() * (256));
	    b2 = 256 - Math.floor(Math.random() * (256));

	    color = '#' + r.toString(16) + g.toString(16) + b.toString(16);
	    color2 = '#' + r2.toString(16) + g2.toString(16) + b2.toString(16);
		return [color, color2];
	},



	getLines: function (ctx, text, maxWidth) {
	//	console.log(ctx.measureText(text).width)
	    var words = text.split(" ");
	    var lines = [];
	    var currentLine = words[0];

	    for (var i = 1; i < words.length; i++) {
	        var word = words[i];
	        var width = ctx.measureText(currentLine + " " + word).width;
	        if (width < maxWidth) {
	            currentLine += " " + word;
	        } else {
	            lines.push(currentLine);
	            currentLine = word;
	        }
	    }
	    lines.push(currentLine);
	    return lines;
	},

	



	choseBG: function(theme){
		let backgroundsArr =[];
				fs.readdir(`${inscriptionFolder}/${theme}/backgrounds/`, (err, files) => {
				  files.forEach(file => {

				    backgroundsArr.push(file);
				  });
				  
				})
		return backgroundsArr;
	},

	getFonts: function (theme, styles_object, inscriptionFolder){
		let pathArr = [];
		let keys = Object.keys(styles_object);
		for(let currentElem of Object.keys(styles_object)){
			if (currentElem.indexOf(`${inscriptionFolder}/${theme}/fonts`) != -1){
				pathArr.push(currentElem);
			}
		};
		return pathArr
	},

	getBackgrounds: function (theme, backgrounds_object, inscriptionFolder){
		let bgArr = [];
		let keys = Object.keys(backgrounds_object);
		for(let currentElem of Object.keys(backgrounds_object)){
			if (currentElem.indexOf(`${inscriptionFolder}/${theme}/backgrounds`) != -1){
				bgArr.push(currentElem);
			}
		};
		return bgArr
	},

	getBackgroundParams: function (width, height, normalWidth, normalHeight){
		let coefficient = normalWidth/normalHeight;
		let obj = {
			
		};

		if ((width/height) <= coefficient){
			obj.sWidth = width;
			obj.sHeight = width/coefficient;
			obj.sx = 0;
			obj.sy = (height - obj.sHeight)/2;
		}else if((width/height) >= coefficient){
			obj.sWidth = height*coefficient;
			obj.sHeight = height;
			obj.sx = (width - obj.sWidth)/2;
			obj.sy = 0;
		}else{
			obj.sWidth = width;
			obj.sHeight = height;
			obj.sx = 0;
			obj.sy = 0;
		}
		return obj;
	},
};