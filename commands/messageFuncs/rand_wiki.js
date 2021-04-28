const Discord = require('discord.js');
const fs = require("fs");
const { Client, MessageEmbed } = require('discord.js');
const config = require('../../DTOM-config.json');
const wiki = require('wikijs').default;
 
let ruBadWords = ['Обсуждение']

let getUrl = function(randoms, message, lang){
	for (var r in randoms) {
    //        console.log(randoms[r]);
            idd = randoms[r].id + ''
         //   console.log(lang)
            fetch(`https://${lang}.wikipedia.org/w/api.php?action=query&prop=info&pageids=`+idd+`&inprop=url&format=json&callback=`)
            	.then(function(response){return response.text();})
            	.then(resp => {
            		return resp.replace(/^.{5}/, '');
            	}).then(resp => {
            		return resp.replace(/.{1}$/, '');
            	})
            	.then(resp => {
            		return (JSON.parse(resp).query.pages);
            	})
            	.then(resp =>{
            	//	console.log(Object.entries(resp)[0][1].fullurl);  
            		const embed = new MessageEmbed()
				      .setColor(config.hook_color.blue)
				      .setDescription(Object.entries(resp)[0][1].fullurl);
				    message.channel.send(embed);          		
            	})
        }
}

let fetchPage = function(message, url, lang, badWords){
	fetch(url)
	    .then(function(response){return response.json();})
	    .then(function(response) {
	        var randoms = response.query.random;
		        for (var r in randoms) {
			        /*console.log(randoms[r].title);
			        console.log(badWords);*/
			        let title = randoms[r].title;
			        let check = false;

			        for(let i = 0; i < badWords.length; i++){
			        	if (title.startsWith(badWords[i])){
			        		check = true;
			        	}
			        }

			        if (check){
			        	fetchPage(message, url, lang, badWords);
			        }else{
			        	getUrl(randoms, message, lang);
			        }			       
			    } 
	    })
	    .catch(function(error){console.log(error);});

}





module.exports.run = async function(client, message, args){
	console.log(123)
	let lang = 'en';
	let badWords = [];
	if (message.guild.region == 'russia'){
		lang = 'ru';
		badWords = ruBadWords;
	}


	var url = `https://${lang}.wikipedia.org/w/api.php`; 

	var params = {
	    action: "query",
	    format: "json",
	    list: "random",
	    rnlimit: "1"
	};

	url = url + "?origin=*";
	Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});

	fetchPage(message, url, lang, badWords);
};
module.exports.info = {
	name: "wikirand",
	event: "message"
};

