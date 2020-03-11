const Discord = require('discord.js');
let bot = new Discord.Client();
const token = 'NDYwNzI4NDk0OTc3MTg3ODQx.XNVzpA.VA6ZVwgeTi98NsDYv4Uw18bVeiI';
bot.on('ready', () => {
	console.log('Discord Connected');
	//sendMessage(`GET SUM!`);
	

});
bot.login(token);
message = ``;
'use strict';
var cur_timestamp= `13:39:29 UTC`;
changed=0;
async function start(){


	
	// Handle ready,error,message events here
    await bot.login(token);
	//Bitmex code here
	const BitMEXClient = require('@terminal123/bitmex-api-lite');                  
	const client = BitMEXClient();  

	const bitmex =  bot.emojis.find(emoji => emoji.name === "bitmex");
	const up = bot.emojis.find(emoji => emoji.name === "up");
		var total = 0;
		var buy_side = `Buy`;
	client.addStream('XBTUSD','trade', function (stream, symbol) {                 
	
	const { table, action, data } = stream;                                      
	//var cur_timestamp= `13:39:29 UTC`;


	for (let dat of data) {                                                      
		 var {side,size,price, timestamp} = dat;           
        timestamp =  timestamp.substr(11, 18);
		timestamp =  timestamp.substr(0, timestamp.length-5);
		
		size_comma = size.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		price_comma = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		
		prev_timestamp = cur_timestamp; 
		cur_timestamp = timestamp;  
		
		
		if((cur_timestamp == prev_timestamp) && (side == `Buy`)){
			total+= size;
		
			//console.log(`XBTUSD ${timestamp} ${total} BOUGHT for ${price_comma}`);         
		}else{
					if( ( total > 599999) ){
						total_comma = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
						sendMessage(`${bitmex} XBTUSD **${total_comma}** contracts ${up} for **${price_comma}** @ ${prev_timestamp}	`);
						//console.log(`XBTUSD ${prev_timestamp} ${total_comma} SOLD for ${price_comma}`);      
					//console.log(`${bitmex} ${timestamp} ${size} ${up}  for ${price}`);                               
					}
					if( total > 4999999 ){
						total_comma = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
						
						sendMessageHIC(`${bitmex} XBTUSD **${total_comma}** contracts ${up} for **${price_comma}** @ ${prev_timestamp}	`);
						//console.log(`XBTUSD ${prev_timestamp} ${total_comma} SOLD for ${price_comma}`);      
					//console.log(`${bitmex} ${timestamp} ${size} ${up}  for ${price}`);                               
					}		
					total=0;
		}
		if((cur_timestamp.substr(6,7) == "15" || cur_timestamp.substr(6,7) == "30" || cur_timestamp.substr(6,7) == "45") && changed==0){
			bot.user.setActivity(`CORN ${price_comma}`, { type: 'playing' });
			changed = 1;
		}else if(cur_timestamp.substr(6,7) != "15" && cur_timestamp.substr(6,7) != "30" && cur_timestamp.substr(6,7) != "45")
		changed = 0;
	  }           
						
	  //bot.user.setActivity(`${price}`, { type: 'WATCHING' }); || cur_timestamp.substr(7,8) = "30" || cur_timestamp.substr(7,8) = "45"
        //console.log(`${cur_timestamp}`)
		//message.guild.me.setNickname
		/*if( (size > 99999) && (side == `Buy`) ){
			sendMessage(`${bitmex} XBTUSD **${size_comma}** contracts ${up} for **${price_comma}** @ ${timestamp} UTC`);
		//console.log(`${bitmex} ${timestamp} ${size} ${up}  for ${price}`);                               
		}
		if( (size > 99999)  && (side == `Buy`) ){
			console.log(`XBTUSD ${timestamp} ${size_comma} BOUGHT for ${price_comma}`);                               
		}*/					
	                                                                           
	});
	//within bitmex code pass messages to async function sendMessage()

}

async function sendMessage(msg) {
	const channelID = '576393648111878208';
	//const channelID = '460778385975803904';
	  try {
		const channel = bot.channels.get(channelID);
		await channel.send(msg);
	  } catch (e) {
		console.error(e);
	  }
}
async function sendMessageHIC(msg) {
	const channelID = '460778385975803904';
	//const channelID = '460778385975803904';
	  try {
		const channel = bot.channels.get(channelID);
		await channel.send(msg);
	  } catch (e) {
		console.error(e);
	  }
}

start();



//var justSent = 0;

// Event to listen to messages sent to the server where the bot is located
bot.on('message', message => {
	// So the bot doesn't reply to iteself
	var m = message.content;
	m = m.toLowerCase();
	
	if (message.author.bot) return;
	
	const troll =  bot.emojis.find(emoji => emoji.name === "troll");
	const thinking_doge =  bot.emojis.find(emoji => emoji.name === "thinking_doge");	
	const pepetux =  bot.emojis.find(emoji => emoji.name === "PepeTux");		
	const chadpepe =  bot.emojis.find(emoji => emoji.name === "chadpepe");	
	
	if(m.includes("chad")){
		
	
		var HOW_R_U = ["hows it going", "how's it going", "hows it goin", "how's it goin", "how are you", "how are you doing", "how are u doing", "how are u doin", "how are u doin"];
		found = 0;
		for (var i = 0; i < HOW_R_U.length; i++) { if (m.includes(HOW_R_U[i])) { found++; }}
		if (found >= 1){ 
			responses = ["I'm fantastical and you?", "Just drank my protein shake.", "Little hungover from last night, but how's it goin?"];
			message.channel.send(responses[Math.floor(Math.random()*responses.length)]);
			return;}	

		var MEWN_IT = ["mewn it", "moon it", "send it to the moon", "send this to the moon", "moon this", "mewn this", "send it to namek", "pump it", "pump this"];
		found = 0;
		for (var i = 0; i < MEWN_IT.length; i++) { if (m.includes(MEWN_IT[i])) { found++; }}
		if (found >= 1){ 
			responses = ["LEEROY JENKINS! :full_moon_with_face: ", "FUQ YEAH!", "I'll see what I can do ;)", "hold my beer :beer:", "MOON MISSION ENGAGED!"];
			message.channel.send(responses[Math.floor(Math.random()*responses.length)]);
			return;}				

		var HI_CHAD = ["hi", "hey", "what's up", "whatup", "what up", "whatsup", "whats up"];
		found = 0;
		for (var i = 0; i < HI_CHAD.length; i++) { if (m.includes(HI_CHAD[i])) { found++; }}
		if (found >= 1){ 
			responses = ["WHATUP DUDE!", "Fuqin sup breh", "What's up man!", "OH HI!", "YO!"];
			message.channel.send(responses[Math.floor(Math.random()*responses.length)]);
			return;}	
		
		var U_DOG = ["u dog", "u doge", "you dog", "you doge", "a dog", "a doge"];
		found = 0;
		for (var i = 0; i < U_DOG.length; i++) { if (m.includes(U_DOG[i])) { found++; }}
		if (found >= 1){
				responses = ["UP U DOGS!", `What can I say? ${troll}`, "What'd you call me?", ` ${thinking_doge} `];
				message.channel.send(responses[Math.floor(Math.random()*responses.length)]);
			return;}			
			
		var WUTISLOVE = ["what is love", "wut is love", "what is luv", "wut is luv"];
		found = 0;
		for (var i = 0; i < WUTISLOVE.length; i++) { if (m.includes(WUTISLOVE[i])) { found++; }}
		if (found >= 1){
				responses = ["Baby dont hurt me! NO MO!", "https://www.youtube.com/watch?v=XPmBnnon0Ek"];
				message.channel.send(responses[Math.floor(Math.random()*responses.length)]);
			return;}					
			
		var GOODNIGHT = ["night", "goodnight", "good night", "see you later", "peace out"];
		found = 0;
		for (var i = 0; i < GOODNIGHT.length; i++) { if (m.includes(GOODNIGHT[i])) { found++; }}
		if (found >= 1){
		responses = [`goodnight ma man`, `til next time bruh`, `keep it real ma dude ${pepetux}`];
				message.channel.send(responses[Math.floor(Math.random()*responses.length)]);
			return;}				

		var LOVEU = ["love you", "luv you", "some love", "sum love", "sum luv", "some luv", "make luv", "make love"];
		found = 0;
		for (var i = 0; i < LOVEU.length; i++) { if (m.includes(LOVEU[i])) { found++; }}
		if (found >= 1){
		responses = [`awww! ${chadpepe}`, `Let's not make Stacey jealous u dog`, `u dog ${thinking_doge}`];
				message.channel.send(responses[Math.floor(Math.random()*responses.length)]);
			return;}	
			
			
		/*
		var TEMPLATE = ["", "", "", "", "", "", "", "", ""];
		found = 0;
		for (var i = 0; i < TEMPLATE.length; i++) { if (m.includes(TEMPLATE[i])) { found++; }}
		if (found >= 1){ 
			responses = ["", "", ""];
			message.channel.send(responses[Math.floor(Math.random()*responses.length)]);
			return;}	
		*/
		
	}
	/*var test = ["test"];
	found = 0;
	for (var i = 0; i < test.length; i++) { if (m.includes(test[i])) { found++; }}
	if (found >= 1){
		//justSent = 3;
		message.channel.send("success");
		return;}				*/

		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
	
	
	
	
	//}
	// Check if the message starts with the `!` trigger
	//if (message.content.indexOf('!') === 0) {
		// Get the user's message excluding the `!`
	//	var text = message.content.substring(1);
		
		// Reverse the message
	//	var reversed = '';
	//	var i = text.length;
		
	//	while (i > 0) {
	//		reversed += text.substring(i - 1, i);
	//		i--;
	//	}
		
		// Reply to the user's message
	//	message.reply(reversed+" yep");
	//}
});

//bot.login(token);