
 //  Create a list that holds all of your cards
const items = ['fa-diamond', 'fa-diamond'
                'fa-paper-plane-o', 'fa-paper-plane-o'
                'fa-anchor', 'fa-anchor'
                'fa-bolt', 'fa-bolt'
                'fa-cube', 'fa-cube'
                'fa-leaf', 'fa-leaf'
                'fa-bicycle', 'fa-bicycle'
                'fa-bomb', 'fa-bomb'
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
 let mins = document.getElementById('mins');
 let sec = document.getElementById('sec');
 const moveNumber = document.querySelector('.moves');
 let moves;
 let openedCards = [];
 let matchedCards = [];
const previousCard = openedCards[0];
// Start the game
function start() {
  // shuffle the cards
  const shuffledCard = shuffle(items);
  //add cardS
  for (var i = 0; i < items.length; i++) {
    const card = document.createElement("li");
    card.classList.add('card');
    card.innerHtml = '<i class='${items[i]}'></i>';
    deck.appendChild(card);

    card.addEventListener('click', appear)
    // when start moves = 0
    moves = 0;
    moveNumber.textContent = moves;
  }
}

// Add event listner for click and show card
function appear(){
  //OPEN first card or second card & compare between them
  const viewCard = this;
       if (openedCards.length === 1) {
         card.classList.add("open", "show");
         openedCards.push(this);
      } else {
        card.classList.add("open", "show");
        openedCards.push(this);
      }
  //match timer start with first click
      if (firstClick === true) {
        timer();
        firstClick = false;
      }
}

// set timer for the game
function timer() {
  setInterval(function(){
    sec.innerText++;
    if (sec.innerText == 60) {
      mins.innerText++;
      sec.innerText = 0;
    }
  },1000);
}
