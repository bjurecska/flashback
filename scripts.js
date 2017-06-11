// JavaScript Document

function flip(el) {
	
	function flipSwitch(name) {
		//loop through all the ids to find the specific id
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
	
	function checkTwo() {
		//function to check if two cards are a match and execute code accordingly
		
		function checkPair(index) {
			//check if the IDs match
			
			if (game.playingCards[index[0]].ID === game.playingCards[index[1]].ID) {
				return true;
			}else{
				return false;
			}
		}
		
		var pair = false;
		
		//loop through the playingCards array
		for (var i = 0; i < game.playingCards.length; i++){
			
			//if card flipped, is not already in the array and not paired add to array
			if (game.playingCards[i].flipped === "yes" && game.cardIndex.includes(i) === false && game.playingCards[i].paired === "no"){
				game.cardIndex.push(i);
				++game.counterForPairs;
			}
			
			//if 2 cards have been flipped executes checkPair and code accordingly. it only flips back the cards when a third card is flipped.
			if (game.counterForPairs === 2) {
				
				//assign game.cardIndex to a local variable so the setTimeout can execute later
				var cardIndex = game.cardIndex;
				pair = checkPair(cardIndex);
				
				if (pair === true) {
					game.playingCards[cardIndex[0]].paired = "yes";
					game.playingCards[cardIndex[1]].paired = "yes";
					game.cardIndex = [];
					return;
				}else{
					setTimeout(function() {flipAnim(game.playingCards[cardIndex[0]].nameID)}, 1000);
					setTimeout(function() {flipAnim(game.playingCards[cardIndex[1]].nameID)}, 1000);
				}
				game.cardIndex = [];
				break;
			}	
		}
	}
	
	function flipAnim(element) {
		//automatic toggle card animation by switching the class of the card
		
		var elem = document.getElementById(element);
		elem.className === "on" ? elem.className = "off" : elem.className = "on";
		
		//toggle the flipped property
		var name = elem.id;
		flipSwitch(name);
	}
	
	function addMove() {
		//add to move counter if 2 cards are flipped
		if (game.counterForPairs === 2) {
			++game.numberOfMoves;
			game.counterForPairs = 0;
		}
	}
	
	function checkValidMove() {
		//checks if there are already two cards that are flipped but not paired
		
		var counter = 0;
		for (var i = 0; i < game.playingCards.length; i++) {
			if (game.playingCards[i].flipped === "yes" && game.playingCards[i].paired === "no"){
				++counter;
				if (counter === 2){
					return false;
				}
			}	
		}
		return true;
	}
	
	//execute code if element is not yet flipped and the move is valid
	var elem = document.getElementById(el);
	var name = elem.id;
	if (elem.className === "off" && checkValidMove() === true) {
		elem.className = "on";
		flipSwitch(name);
		checkTwo();
		addMove();
	}
}

function preLoadListeners() {
	//preload event listeners when the game starts
	
	document.addEventListener("click", function() {
		//display number of moves every time a user clicks
		
		//remove element before updating to new element
		var element = document.getElementById("moves");
		var oldBoldBox = document.getElementsByTagName("b")[0];//first b element. if there is any other b elements added this needs to change
		element.removeChild(oldBoldBox);

		//updates the move count by creating a new element
		var boldBox = document.createElement("b");
		var newLine = document.createTextNode("Moves: " + game.numberOfMoves);
		boldBox.appendChild(newLine);
		element.appendChild(boldBox);
	});

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
	numberOfMoves: 0,
	counterForPairs: 0,
	cardIndex: [],
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
		
		//remove all previous images
		var cardbackNode = document.getElementsByClassName("cardback");
		for (var x = 0; x < cardbackNode.length; x++){
			cardbackNode[x].innerHTML = "";
		}
		
		//set all card classes IDs classes to off
		for (var y = 0; y < game.playingCards.length; y++) {
			var tempObj = document.getElementById(game.playingCards[y].nameID);
			tempObj.className = "off";
		}
		
		//delete all the game data
		game.playingCards = {
			imageLocation: "",
			flipped: "",
			paired: "",
			ID: "",
			nameID: ""
		};
		game.numberOfMoves = 0;
		game.counterForPairs = 0;
		game.cardIndex = [];
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
//the basic gameplay structure on starting a new game
	
	//reset cards
	game.cardReset();
	//init cards
	game.cardInit();
	
	//set timer to 0
	game.timerReset();
	//start timer
	game.timerStart();
	
	//set stars to default

}

//initialize data when page loads
newGame();
preLoadListeners();	


