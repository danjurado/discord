const Discord = require('discord.js');
let bot = new Discord.Client();
let chad = new Discord.GuildMember("460728494977187841");
const token = 'NDYwNzMxMzgwODYzNzI5NjY0.DtaDzw.zf6lt6b_UcUkXCeuFVZbw-9tG58';
bot.on('ready', () => {
	console.log('Discord Connected');
	//sendMessage(`Wassup boiz... mmm yeh...`);
});
bot.login(token);
changed =0;

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
			var total = 0;
	client.addStream('XBTUSD','trade', function (stream, symbol) {                 
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
		
		//message.guild.member(client.user).setNickname('myNicknameGoesHere')
		
		//if( (second == 5) || (second == 0) ){ bot.nickname = `Melvin BTC ${price_comma}`;  }
		//console.log(`second: ${second}`);
		
		if((cur_timestamp == prev_timestamp) && (side == `Sell`)){
			total+= size;
			//console.log(`XBTUSD ${timestamp} ${total} BOUGHT for ${price_comma}`);         
		}else{
					if( ( total > 599999) ){
						total_comma = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
						sendMessage(`${bitmex} XBTUSD **${total_comma}** contracts ${down} for **${price_comma}** @ ${prev_timestamp}	`);
						//console.log(`XBTUSD ${prev_timestamp} ${total_comma} SOLD for ${price_comma}`);      
					//console.log(`${bitmex} ${timestamp} ${size} ${up}  for ${price}`);                               
					}
					if( total > 4999999 ){
						total_comma = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

						sendMessageHIC(`${bitmex} XBTUSD **${total_comma}** contracts ${down} for **${price_comma}** @ ${prev_timestamp}	`);
						//console.log(`XBTUSD ${prev_timestamp} ${total_comma} SOLD for ${price_comma}`);      
					//console.log(`${bitmex} ${timestamp} ${size} ${up}  for ${price}`);                               
					}		
					total=0;
		}			
		if((cur_timestamp.substr(6,7) == "15" || cur_timestamp.substr(6,7) == "30" || cur_timestamp.substr(6,7) == "45") && changed==0){
			bot.user.setActivity(`CORN ${price_comma}`, { type: 'playing' });

			//chad.setnick("CORN ${price_comma}");
			changed = 1;
		}else if(cur_timestamp.substr(6,7) != "15" && cur_timestamp.substr(6,7) != "30" && cur_timestamp.substr(6,7) != "45")
		changed = 0;
	  }                                                                            
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

// Event to listen to messages sent to the server where the bot is located
bot.on('message', message => {
	// So the bot doesn't reply to iteself
	
	//if (justSent > 0){
	//		justSent--;
	//}else{
	var m = message.content;
	m = m.toLowerCase();
	
	const troll = bot.emojis.find(emoji => emoji.name === "troll");
	const melvinpepe = bot.emojis.find(emoji => emoji.name === "melvinpepe");	
	const wojpink = bot.emojis.find(emoji => emoji.name === "wojpink");	
	const supermonka = bot.emojis.find(emoji => emoji.name === "supermonka");	
	
	if (message.author.bot) return;
		
	if(m.includes("melvin")){
	
	
	var HOW_R_U = ["hows it going", "how's it going", "hows it goin", "how's it goin", "how are you", "how are you doing", "how are u doing", "how are u doin", "how are u doin"];
	found = 0;
	for (var i = 0; i < HOW_R_U.length; i++) { if (m.includes(HOW_R_U[i])) { found++; }}
	if (found >= 1){ 
		responses = ["I'm like whatever", "are you here to keep me company?", "not too great... but you already knew that", "just.. like... you know.. ", "basically just taking the occasional dump", "why do you even care?.. "];
		message.channel.send(responses[Math.floor(Math.random()*responses.length)]);
		return;}		
	
	var DUMP_IT = ["dump it", "taking a  dump", "dump this", "dump corn"];
	found = 0;
	for (var i = 0; i < DUMP_IT.length; i++) { if (m.includes(DUMP_IT[i])) { found++; }}
	if (found >= 1){
		responses = [":poop:", "Like I dumped it on your sister? Just kidding.. don't hurt me.", "Dump is my middle name", "My stomach doesn't feel too good :nauseated_face: ", "I guess it could try... meh"];
		message.channel.send(responses[Math.floor(Math.random()*responses.length)]);
		return;}		
	
	var FUCK_YOU_MELVIN = ["fuck you", "get fukt", "wtf", "i hate you", "wtf", "fucking", "piss off", "get rekt", "I hope you die", "I hope u die", "die in a fire", "cunt"];
	found = 0;
	for (var i = 0; i < FUCK_YOU_MELVIN.length; i++) { if (m.includes(FUCK_YOU_MELVIN[i])) { found++; }}
	if (found >= 1){
			responses = [`no u ${troll}`, "Don't get all excited you edgelord", `Classic soy boy amirite? ${troll}`, "You're not the first person to say that", "Whatever.. like I care", "feelings mutual"];
			message.channel.send(responses[Math.floor(Math.random()*responses.length)]);
		return;}	
		
	var GOOD_MORNING = ["top of the morning", "good morning", "morning", "good morning to you"];
	found = 0;
	for (var i = 0; i < GOOD_MORNING.length; i++) { if (m.includes(GOOD_MORNING[i])) { found++; }}
	if (found >= 1){
		responses = ["Meh... whatever... I didn't even sleep last night... :zzz:", "Sleep well?", "Morning to you too"];
		message.channel.send(responses[Math.floor(Math.random()*responses.length)]);
		return;}			

	var U_DOG = ["u dog", "u doge", "you dog", "you doge", "a dog", "a doge"];
	found = 0;
	for (var i = 0; i < U_DOG.length; i++) { if (m.includes(U_DOG[i])) { found++; }}
	if (found >= 1){
			responses = ["I take dumps like one else... get on my level", "im more of a bitch really", "u cat... lulz .. ok yeah not funny"];
			message.channel.send(responses[Math.floor(Math.random()*responses.length)]);
		return;}			
		
	var GAY = ["u faggot", "you faggot", "you fag", "u fag", "you're a fag", "youre a fag", "cocksucker"];
	found = 0;
	for (var i = 0; i < GAY.length; i++) { if (m.includes(GAY[i])) { found++; }}
	if (found >= 1){
			responses = ["Is that an invitation.. oh baby!", "I like chics too... but yeah..", "You'd know .. huh big boy?", "oh baby talk dirty to me"];
			message.channel.send(responses[Math.floor(Math.random()*responses.length)]);
		return;}		
	
		var WUTISLOVE = ["what is love", "wut is love", "what is luv", "wut is luv"];
		found = 0;
		for (var i = 0; i < WUTISLOVE.length; i++) { if (m.includes(WUTISLOVE[i])) { found++; }}
		if (found >= 1){
				responses = ["Dunno... I'm dating Becky.. she's just using me for my corn"];
				message.channel.send(responses[Math.floor(Math.random()*responses.length)]);
			return;}				
		
		var HIMELVIN = ["hi", "hello", "heya", "greetings"];
		found = 0;
		for (var i = 0; i < HIMELVIN.length; i++) { if (m.includes(HIMELVIN[i])) { found++; }}
		if (found >= 1){
				responses = ["me?", ":wave:", "um.. hi?", "sup", "hello"];
				message.channel.send(responses[Math.floor(Math.random()*responses.length)]);
			return;}		

		var fukoff = ["fuck off", "fuk off", "go away", "leave", "stop it", "please stop"];
		found = 0;
		for (var i = 0; i < fukoff.length; i++) { if (m.includes(fukoff[i])) { found++; }}
		if (found >= 1){
				responses = ["MAKE ME", "I prefer not to sir", "cant stop! wont stop!", `${melvinpepe}`];
				message.channel.send(responses[Math.floor(Math.random()*responses.length)]);
			return;}		
	
		var GOODNIGHT = ["night", "goodnight", "good night"];
		found = 0;
		for (var i = 0; i < GOODNIGHT.length; i++) { if (m.includes(GOODNIGHT[i])) { found++; }}
		if (found >= 1){
				responses = [`goodnight... forever.. k i guess that was a bit too dark`, `who turned out the lights?!?!! ${wojpink}`, `ahh! I can't see! ${supermonka}`];
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