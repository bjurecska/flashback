// JavaScript Document

function flip(el) {
	//toggle card animation by switching the class of the card
	var elem = document.getElementById(el);
	elem.className === "on" ? elem.className = "off" : elem.className = "on";
}

function newGame() {
	
	var images = [
	//images and corresponding id locations
		[1, "images/twitter.png"],
		[1, "images/twitter.png"],
		[2, "images/spotify.png"],
		[2, "images/spotify.png"],
		[3, "images/googlemaps.png"],
		[3, "images/googlemaps.png"],
		[4, "images/facebook.png"],
		[4, "images/facebook.png"],
		[5, "images/engadget.png"],
		[5, "images/engadget.png"],
		[6, "images/bmw.png"],
		[6, "images/bmw.png"],
		[7, "images/apple.png"],
		[7, "images/apple.png"],
		[8, "images/android.png"],
		[8, "images/android.png"]
	];
	
	function createCards() {
	//create an array for all the cards
		var cards = [];

		for (var i = 0; i <= 15; i++) {
			cards[i] = {}
		}
		return cards;
	}
	
	function randomCardImage (images) {
	//splice out a random item from the images array and return it
		var randomIndex = Math.floor(Math.random() * images.length);
		var card = images.splice(randomIndex, 1);
		return card;
	}
	
	function displayCards (index) {
	//function to populate all cards
		var cardId = "card" + (index+1);
		var element = document.getElementById(cardId);
		var elementCardBack = element.getElementsByClassName("cardback")[0];
		var img=document.createElement("img");
		img.src=playingCards[index].imageLocation
		elementCardBack.appendChild(img);
	}
	
	var playingCards = createCards();
	
	for (var i = 0; i < playingCards.length; i++) {
	//loop through each card and populate details
	
		var randomCardInfo = randomCardImage(images);
		
		//create card object details
		playingCards[i].imageLocation = randomCardInfo[0][1];
		playingCards[i].flipped = "no";
		playingCards[i].paired = "no";
		playingCards[i].ID = randomCardInfo[0][0];
		
		//populate the card images
		displayCards(i);
	}
	
	//set timer to 0
	
	//set moves to 0
	
	//set stars to default

}

newGame();


























