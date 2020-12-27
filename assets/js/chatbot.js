var trigger = [
	["hi","hey","hello"], 
	["how are you", "how is life", "how are things"],
	["what are you doing", "what is going on"],
	["Is there any teacher available"],
	["who are you", "are you human", "are you bot", "are you human or bot"],
	["who created you", "who made you"],
	["your name please",  "your name", "may i know your name", "what is your name"],
	["Can you help me","can I get some help","where is the teacher"],
	["Is the doubt room open", "is there any doubt room","where can i resolve my doubts"],
	["bad", "bored", "tired"],
	["help me", "tell me story", "tell me joke"],
	["ah", "yes", "ok", "okay", "nice", "thanks", "thank you"],
	["bye", "good bye", "goodbye", "see you later"]
];
var reply = [
	["Hi","Hey","Hello"], 
	["Fine", "Pretty well", "Fantastic"],
	["Nothing much", "About to go to sleep", "Can you guest?", "I don't know actually"],
	["We will try to connect you soon"],
	["I am just a bot", "I am a bot. What are you?"],
	["Team Atamnirbhar", "My God"],
	["I am nameless", "I don't have a name"],
	["We'll get you a help soon", "We'll get you a help soon","We'll get you a help soon"],
	["You will be shifted to doubt room soon", "You will connect you to doubt room soon","teacher will get to you soon"],
	["Why?", "Why? You shouldn't!", "Try watching TV"],
	["I will", "What about?"],
	["Tell me a story", "Tell me a joke", "Tell me about yourself", "You are welcome"],
	["Bye", "Goodbye", "See you later"]
];
var alternative = ["Haha...", "Eh..."];
document.querySelector("#input").addEventListener("keypress", function(e){
	var key = e.which || e.keyCode;
	if(key === 13){ //Enter button
		var input = document.getElementById("input").value;
		document.getElementById("user").innerHTML = input;
		output(input);
	}
});
function output(input){
	try{
		var product = input + "=" + eval(input);
	} catch(e){
		var text = (input.toLowerCase()).replace(/[^\w\s\d]/gi, ""); //remove all chars except words, space and 
		text = text.replace(/ a /g, " ").replace(/i feel /g, "").replace(/whats/g, "what is").replace(/please /g, "").replace(/ please/g, "");
		if(compare(trigger, reply, text)){
			var product = compare(trigger, reply, text);
		} else {
			var product = alternative[Math.floor(Math.random()*alternative.length)];
		}
	}
	document.getElementById("chatbot").innerHTML = product;
	speak(product);
	document.getElementById("input").value = ""; //clear input value
}
function compare(arr, array, string){
	var item;
	for(var x=0; x<arr.length; x++){
		for(var y=0; y<array.length; y++){
			if(arr[x][y] == string){
				items = array[x];
				item =  items[Math.floor(Math.random()*items.length)];
			}
		}
	}
	return item;
}
function speak(string){
	var utterance = new SpeechSynthesisUtterance();
	utterance.voice = speechSynthesis.getVoices().filter(function(voice){return voice.name == "Agnes";})[0];
	utterance.text = string;
	utterance.lang = "en-US";
	utterance.volume = 1; //0-1 interval
	utterance.rate = 1;
	utterance.pitch = 2; //0-2 interval
	speechSynthesis.speak(utterance);
}