'use strict';

//store all elements we need in variables
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0 = document.querySelector('#score--0');
const score1 = document.querySelector('#score--1');
const die = document.querySelector('.dice');
const current0 = document.querySelector('#current--0');
const current1 = document.querySelector('#current--1');
const btnReset = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//instantiate variables
let scores, currentScore, activePlayer, playing;

//initialization
function init() {
  //set game state
  scores = [0, 0];
  playing = true;
  currentScore = 0;
  activePlayer = 0;

  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;

  die.classList.add('hidden');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
}
init();

//functions
//toggle
function switchPlayer() {
  //reset scores
  currentScore = 0;
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  //switch
  activePlayer = activePlayer === 1 ? 0 : 1;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
}

//user rolls
btnRoll.addEventListener('click', function () {
  //check game state
  if (playing) {
    //generate random roll
    const result = Math.trunc(Math.random() * 6 + 1);
    //show die and update image
    die.src = `dice-${result}.png`;
    die.classList.remove('hidden');
    //check for 1
    if (result !== 1) {
      //add roll to current score
      currentScore += result;
      document.querySelector(
        `#current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

//user holds
btnHold.addEventListener('click', function () {
  //check game state
  if (playing) {
    //update scores array
    scores[activePlayer] += currentScore;
    //update display
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    //win condition
    if (scores[activePlayer] >= 100) {
      //win
      playing = false;
      //set winner and remove active
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      //hide die
      die.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});

//user resets game
btnReset.addEventListener('click', init);
