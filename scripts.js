// JavaScript Document

function flip(el) {
	function flipSwitch(name) {
		//toggle the flipped property on the card that is being flipped
		for (var i = 0; i < game.playingCards.length; i++) {
			if (game.playingCards[i].nameID === name) {
				if (game.playingCards[i].flipped === "no") {
					game.playingCards[i].flipped = "yes";
				}else{
					game.playingCards[i].flipped = "no";
				}
			}
		}
	};
	
	//toggle card animation by switching the class of the card
	var elem = document.getElementById(el);
	elem.className === "on" ? elem.className = "off" : elem.className = "on";
	
	//toggle the flipped property
	var name = elem.id;
	flipSwitch(name);
	
}

var game = {
	//game object with important game functions
	playingCards: {
		imageLocation: "",
		flipped: "",
		paired: "",
		ID: "",
		nameID: ""
	},
	timerStart: function() {
		//start the main game timer
		game.secondsElapsed = 0;
		game.gameTimerId = setInterval(function countTimer() {
			function twoDigits(time) {
			//assigns 2 digits to seconds or minutes
			return time > 9 ? "" + time : "0" + time;
			}

			++game.secondsElapsed;
			var hour = Math.floor(game.secondsElapsed / 3600);
			hour = twoDigits(hour);

			var minute = Math.floor((game.secondsElapsed - 3600 * hour) / 60);
			minute = twoDigits(minute);

			var seconds = game.secondsElapsed - (3600 * hour + 60 * minute);
			seconds = twoDigits(seconds);

			//hides the hour unless it got to 1 hour
			if (hour === "00") {
				document.getElementById("timer").innerHTML = "<b>Time: </b>" + minute + ":" + seconds;
			}else{
				document.getElementById("timer").innerHTML = "<b>Time: </b>" + hour + ":" + minute + ":" + seconds;
			}
		}, 1000);
	},
	timerReset: function() {
		//reset the main game timer
		clearInterval(game.gameTimerId);
		game.secondsElapsed = 0;
	},
	cardReset: function(){
		//reset all the cards into their normal state
		if (game.playingCards !== undefined) {
			for (var i = 0; i < game.playingCards.length; i++) {
				//flip all the cards back
				var elem = document.getElementById(game.playingCards[i].nameID);
				elem.className = "off";
			}
		}
		
		//delete all card objects
		game.playingCards = [];
		
		//remove all previous images
		var cardbackNode = document.getElementsByClassName("cardback");
		for (var i = 0; i < cardbackNode.length; i++){
			cardbackNode[i].innerHTML = "";
		}
	},
	cardInit: function() {
		//set up all the cards
		
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
			img.src=game.playingCards[index].imageLocation;
			elementCardBack.appendChild(img);
			return cardId;
		}
		
		game.playingCards = createCards();
	
		for (var i = 0; i < game.playingCards.length; i++) {
		//loop through each card and populate details
	
			var randomCardInfo = randomCardImage(images);

			//create card object details
			game.playingCards[i].imageLocation = randomCardInfo[0][1];
			game.playingCards[i].flipped = "no";
			game.playingCards[i].paired = "no";
			game.playingCards[i].ID = randomCardInfo[0][0];
			//populate card images and create new property with name
			game.playingCards[i].nameID = displayCards(i);	
		}
	},
};

function newGame() {

	//reset cards
	game.cardReset();
	//init cards
	game.cardInit();
	
	//set timer to 0
	game.timerReset();
	//start timer
	game.timerStart();
	
	//set moves to 0
	numberOfMoves = 0;
	

	//set stars to default

}

newGame();
	


//add an event listener to all classes name cardfront
var moveCounter = document.getElementsByClassName("cardfront");
var numberOfMoves = 0;

for (var i = 0; i < moveCounter.length; i++) {
	moveCounter[i].addEventListener("click", function() {
		numberOfMoves += 1;
	});
}

//display number of moves every time a user clicks
document.addEventListener("click", function() {
	//remove element before updating to new element
	var element = document.getElementById("moves");
	var oldBoldBox = document.getElementsByTagName("b")[0];//first b element. if there is any other b elements added this needs to change
	element.removeChild(oldBoldBox);
	
	//updates the move count by creating a new element
	var boldBox = document.createElement("b");
	var newLine = document.createTextNode("Moves: " + numberOfMoves);
	boldBox.appendChild(newLine);
	element.appendChild(boldBox);
});




























