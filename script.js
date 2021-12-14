'use strict';
// selectiong elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');

const diceRoll = document.querySelector('.btn--roll');
const diceNew = document.querySelector('.btn--new');
const diceHold = document.querySelector('.btn--hold');
const dice = document.getElementById('dice');

// starting values
let scores, activePlayer, currentScore, playing;

const init = function () {
  scores = [0, 0];
  activePlayer = 0;
  currentScore = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;

  dice.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();

// switch user funciton

const swicthPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// roll dice functionality
diceRoll.addEventListener('click', function () {
  if (playing) {
    // playing soundsss
    const audioRoll = new Audio('dice34roll.mp3');
    audioRoll.play();

    // creat random number
    const randomNumber = Math.trunc(Math.random() * 6 + 1);
    //display dice
    dice.classList.remove('hidden');
    dice.style.display = 'initial';
    dice.src = `dice-${randomNumber}.png`;
    // display number
    if (randomNumber !== 1) {
      currentScore += randomNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //   switch to other plalyer
      swicthPlayer();
    }
  }
});

diceHold.addEventListener('click', function () {
  if (playing) {
    // playing soundsss
    const audioHold = new Audio('aqua.mp3');
    audioHold.play();
    //   adding current score to active player
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // finish game
    if (scores[activePlayer] >= 30) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      dice.style.display = 'none';
    } else {
      // swictching to the other player
      swicthPlayer();
    }
  }
});

diceNew.addEventListener('click', init);

diceNew.addEventListener('click', function () {
  const audioNew = new Audio('newgame.mp3');
  audioNew.play();
});
