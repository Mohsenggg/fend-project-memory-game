//  Create a list that holds all of your cards
const items = ["fa fa-diamond", "fa fa-diamond",
               "fa fa-paper-plane-o","fa fa-paper-plane-o",
               "fa fa-anchor", "fa fa-anchor",
               "fa fa-bolt", "fa fa-bolt",
               "fa fa-cube", "fa fa-cube",
               "fa fa-leaf", "fa fa-leaf",
               "fa fa-bicycle", "fa fa-bicycle",
               "fa fa-bomb", "fa fa-bomb",
               ];

/* Display the cards on the page
*   - shuffle the list of cards using the provided "shuffle" method below
*   - loop through each card and create its HTML
*   - add each card's HTML to the page
*/
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
   var currentIndex = array.length, temporaryValue, randomIndex;

   while (currentIndex !== 0) {
       randomIndex = Math.floor(Math.random() * currentIndex);
       currentIndex -= 1;
       temporaryValue = array[currentIndex];
       array[currentIndex] = array[randomIndex];
       array[randomIndex] = temporaryValue;
   }

   return array;
}

/*
* set up the event listener for a card. If a card is clicked:
*  - display the card's symbol (put this functionality in another function that you call from this one)
*  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
*  - if the list already has another card, check to see if the two cards match
*    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
*    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
*    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
*    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
*/

const deck = document.querySelector('.deck');
const moveNumber = document.querySelector('.moves');
const firstStar = document.getElementById('firstStar');
const secondStar = document.getElementById('secondStar');
const thirStar = document.getElementById('thirdStar');
const model = document.getElementById('evaluation');
const modelStars = document.getElementById('model__stars');
const modelMoves = document.getElementById('model__moves');
let mins = document.getElementById('mins');
let sec = document.getElementById('sec');
let time;
let moves;
let starsNumber = 3;
let openedCards = [];
let matchedCards = [];
let isFirstClick = true;


// Start the game
function start() {
  mins.innerText = 0;
  sec.innerText = 0;
 // shuffle the cards
 const shuffledCard = shuffle(items);
 //add cardS
 for (let i = 0; i < items.length; i++) {
   const card = document.createElement("li");
   card.classList.add('card');
   card.innerHTML = `<i class="${items[i]}"></i>`;
   deck.appendChild(card);
   // Add event listner for click and show card
   appear(card);
   moves = 0;
   moveNumber.textContent = moves;
   timer();
   clearInterval(time);
   }
}

// Add event listner for click and show card
function appear(card){
 //OPEN first card or second card & compare between them
 function addCard() {
      const viewCard = this;
      const previousCard = openedCards[0];

        if (openedCards.length === 1) {
          card.classList.add("open", "show");
          openedCards.push(this);
          moves++;
          moveNumber.textContent = moves;
          compare(viewCard, previousCard);
          stars();
       } else {
         card.classList.add("open", "show");
         openedCards.push(this);
         stars();
       }
       // match timer start with first click
       if (isFirstClick === true) {
         timer();
         isFirstClick = false;
       }
 }
 card.addEventListener('click', addCard);
 }

// compare between two oppened card
function compare(viewCard, previousCard) {
         // when 2 cards matched
       if(viewCard.innerHTML === previousCard.innerHTML){
         viewCard.classList.add('match');
         previousCard.classList.add('match');
         matchedCards.push(viewCard, previousCard);
         openedCards = [];
         // when all cards match
         completeCards();
         // when 2 cards not matched
       } else {
         // show the second card for a 900s
         setTimeout(function () {
           viewCard.classList.add('unmatch');
           viewCard.classList.remove('open');
           previousCard.classList.add('unmatch');
           previousCard.classList.remove('open');
           setTimeout(function() {
             viewCard.classList.remove('unmatch', 'show');
             previousCard.classList.remove('unmatch', 'show');
           }, 500);
         }, 500);
         openedCards = [];
       }
}

function completeCards() {
  if(matchedCards.length === 16) {
    setInterval(finish, 2000)
  }
}

// add stars according to moves number
function stars() {
  starsNumber = 3;
  if (moves >= 16 && moves < 24) {
    thirdStar.classList.remove('fa-star');
    thirdStar.classList.add('fa-star-o');
    starsNumber = 2;
  } else if (moves >= 24 && moves < 32) {
    secondStar.classList.remove('fa-star');
    secondStar.classList.add('fa-star-o');
    starsNumber = 1;
  } else if (moves >= 32 ) {
    firstStar.classList.remove('fa-star');
    firstStar.classList.add('fa-star-o');
    starsNumber = 0;
  }
}

// set timer for the game
function timer() {
  time = setInterval(function(){
   sec.innerText++;
   if (sec.innerText == 60) {
     mins.innerText++;
     sec.innerText = 0;
   }
 },1000);
}

// final message appears all cards match
function finish() {
  model.style.display = "block";
  modelMoves.innerText = moves;
  modelStars.innerText = starsNumber;
  clearInterval(time);
  // reset the page after click on page
  document.querySelector('.model').addEventListener('click', function() {
    model.style.display = "none";
    reset();
  });
}

function reset() {
  window.location.reload(true);
}

// add functionality to reset buttom 
const resetBtn = document.querySelector('.restart');
resetBtn.addEventListener('click', reset);

start();
