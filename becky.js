const Discord = require('discord.js');
let bot = new Discord.Client();
const token = 'NTg4MDM2ODc4OTM0OTk5MDc2.XP_Sgg.clJz48a_B1cQGyGorTZf14PcPDQ';
bot.on('ready', () => {
	console.log('Discord Connected');
	//sendMessage(`Wassup boiz... mmm yeh...`);
});
bot.login(token);
	
'use strict';
	var cur_timestamp= `13:39:29 UTC`;
async function start(){

	// Handle ready,error,message events here
    await bot.login(token);
	//Bitmex code here
	const BitMEXClient = require('@terminal123/bitmex-api-lite');                  
	const client = BitMEXClient();  

	const bitmex =  bot.emojis.find(emoji => emoji.name === "bitmex");
	const down = bot.emojis.find(emoji => emoji.name === "down");
	const up = bot.emojis.find(emoji => emoji.name === "up");	
			var total = 0;
	client.addStream(`ETHUSD`,'trade', function (stream, symbol) {                 
	  const { table, action, data } = stream;                                      
	//var cur_timestamp= `13:39:29 UTC`;
	
	for (let dat of data) {                                                      
		 var {side,size,price, timestamp} = dat;           
		 
        timestamp =  timestamp.substr(11, 18);
		timestamp =  timestamp.substr(0, timestamp.length-5);
		second =  timestamp.charAt(7);
		
		size_comma = size.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		price_comma = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		
		prev_timestamp = cur_timestamp; 
		cur_timestamp = timestamp;  
		
		if((cur_timestamp == prev_timestamp) && (side == `Sell`)){
			total+= size;
			//console.log(`XBTUSD ${timestamp} ${total} BOUGHT for ${price_comma}`);         
		}else{
					if( ( total > 99999) ){
						total_comma = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
						sendMessage(`${bitmex} ETHUSD **${total_comma}** contracts ${down} for **${price}** @ ${prev_timestamp}	`);
					}
					if( total > 499999 ){
						total_comma = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
						sendMessageHIC(`${bitmex} ETHUSD **${total_comma}** contracts ${down} for **${price}** @ ${prev_timestamp}	`);
					}		
					total=0;
		}				
	  }                                                                            
	});
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

bot.on('message', message => {

	var m = message.content;
	m = m.toLowerCase();
	
	const troll = bot.emojis.find(emoji => emoji.name === "troll");
	const melvinpepe = bot.emojis.find(emoji => emoji.name === "melvinpepe");	
	const wojpink = bot.emojis.find(emoji => emoji.name === "wojpink");	
	const supermonka = bot.emojis.find(emoji => emoji.name === "supermonka");	
	
	if (message.author.bot) return;
		
	if(m.includes("becky")){
	
	
	var HOW_R_U = ["hows it going", "how's it going", "hows it goin", "how's it goin", "how are you", "how are you doing", "how are u doing", "how are u doin", "how are u doin"];
	found = 0;
	for (var i = 0; i < HOW_R_U.length; i++) { if (m.includes(HOW_R_U[i])) { found++; }}
	if (found >= 1){ 
		responses = [`having a good time here in Frogtown! and you? :)`, `not too bad if i do say so myself`, `i'm thinking of going out shopping a little later`, `just checkin out some crypto markets`];
		message.channel.send(responses[Math.floor(Math.random()*responses.length)]);
		return;}		

	var MEWN_IT = ["mewn it", "moon it", "send it to the moon", "send this to the moon", "moon this", "mewn this", "send it to namek", "pump it", "pump this"];
	found = 0;
	for (var i = 0; i < MEWN_IT.length; i++) { if (m.includes(MEWN_IT[i])) { found++; }}
	if (found >= 1){ 
		responses = ["hehe", `i'll do my best :D`, `buckle up space cadet!`];
		message.channel.send(responses[Math.floor(Math.random()*responses.length)]);
		return;}				
	
	var FUCK_YOU_stacey = ["fuck you", "get fukt", "wtf", "i hate you", "wtf", "fucking", "piss off", "get rekt", "I hope you die", "I hope u die", "die in a fire", "cunt"];
	found = 0;
	for (var i = 0; i < FUCK_YOU_stacey.length; i++) { if (m.includes(FUCK_YOU_stacey[i])) { found++; }}
	if (found >= 1){
			responses = [`..`, `wow .. just wow`, `excuse me?`, `do you kiss your mother with that mouth?`];
			message.channel.send(responses[Math.floor(Math.random()*responses.length)]);
		return;}	
		
	var GOOD_MORNING = ["top of the morning", "good morning", "morning", "good morning to you"];
	found = 0;
	for (var i = 0; i < GOOD_MORNING.length; i++) { if (m.includes(GOOD_MORNING[i])) { found++; }}
	if (found >= 1){
		responses = ["morning! :coffee:"];
		message.channel.send(responses[Math.floor(Math.random()*responses.length)]);
		return;}			

		var HISTACEY = ["hi", "hello", "heya", "greetings"];
		found = 0;
		for (var i = 0; i < HISTACEY.length; i++) { if (m.includes(HISTACEY[i])) { found++; }}
		if (found >= 1){
				responses = ["Hiya :D", ":wave:", "Heya sugar", "*ribbit*", "howdy"];
				message.channel.send(responses[Math.floor(Math.random()*responses.length)]);
			return;}		

		var fukoff = ["fuck off", "fuk off", "go away", "leave", "stop it", "please stop"];
		found = 0;
		for (var i = 0; i < fukoff.length; i++) { if (m.includes(fukoff[i])) { found++; }}
		if (found >= 1){
				responses = ["um... wtf?", "How about no?", "Do I even know you?", `whatever..`];
				message.channel.send(responses[Math.floor(Math.random()*responses.length)]);
			return;}		
	
		var GOODNIGHT = ["night", "goodnight", "good night"];
		found = 0;
		for (var i = 0; i < GOODNIGHT.length; i++) { if (m.includes(GOODNIGHT[i])) { found++; }}
		if (found >= 1){
				responses = [`goodnight :)`, `night night`, `seeya`];
				message.channel.send(responses[Math.floor(Math.random()*responses.length)]);
			return;}			
	
	}		
		
		/*
		var TEMPLATE = ["", "", "", "", "", "", "", "", ""];
		found = 0;
		for (var i = 0; i < TEMPLATE.length; i++) { if (m.includes(TEMPLATE[i])) { found++; }}
		if (found >= 1){ 
			responses = ["", "", ""];
			message.channel.send(responses[Math.floor(Math.random()*responses.length)]);
			return;}	
		*/		
});

//bot.login(token);