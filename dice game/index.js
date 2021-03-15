'use strict'

const rollDiceBtn = document.querySelector('.btn--roll')
const holdBtn = document.querySelector('.btn--hold')
const newGameBtn = document.querySelector('.btn--new')
const dice = document.querySelector('.dice')
const player1 = document.querySelector('.player--0')
const player2 = document.querySelector('.player--1')
const scorePlayer1 = document.querySelector('#score--0')
const scorePlayer2 = document.querySelector('#score--1')
const currentScorePlayer1 = document.querySelector('#current--0')
const currentScorePlayer2 = document.querySelector('#current--1')

const score = 100 // if the score of the player is >= of the score value this player win
let isPlaying = true // Game State

dice.style.display = 'none'

const player1Turn = () => {
  player1.classList.add('player--active')
  player2.classList.remove('player--active')
}

const player2Turn = () => {
  player2.classList.add('player--active')
  player1.classList.remove('player--active')
}

const rollDice = () => {
  if (isPlaying) {
    let diceNum = Math.floor(Math.random() * 6) + 1
    dice.style.display = 'block'
    dice.setAttribute('src', `images/dice-${diceNum}.png`)
    // Display Player's Score if dice is not equal 1
    if (diceNum !== 1) {
      // Check if it's Player's 1 turn
      if (player1.classList.contains('player--active')) {
        let currentScore = diceNum
        currentScorePlayer1.textContent =
          Number(currentScorePlayer1.textContent) + currentScore
      }
      // Check if it's Player's 2 turn
      else if (player2.classList.contains('player--active')) {
        let currentScore = diceNum
        currentScorePlayer2.textContent =
          Number(currentScorePlayer2.textContent) + currentScore
      }
    }
    // If dice is equal 1 the Players loses their turn and score
    else if (diceNum === 1) {
      // Check if it's Player's 1 turn
      if (player1.classList.contains('player--active')) {
        currentScorePlayer1.textContent = 0
        player2Turn()
      }
      // Check if it's Player's 2 turn
      else if (player2.classList.contains('player--active')) {
        currentScorePlayer2.textContent = 0
        player1Turn()
      }
    }
  }
}

const hold = () => {
  // Add the current score to Player 1 and change the turn to Player 2
  if (isPlaying) {
    if (player1.classList.contains('player--active')) {
      scorePlayer1.textContent =
        Number(currentScorePlayer1.textContent) +
        Number(scorePlayer1.textContent)
      currentScorePlayer1.textContent = 0
      player2Turn()
    }
    // Add the current score to Player 2 and change the turn to Player 1
    else if (player2.classList.contains('player--active')) {
      scorePlayer2.textContent =
        Number(currentScorePlayer2.textContent) +
        Number(scorePlayer2.textContent)
      currentScorePlayer2.textContent = 0
      player1Turn()
    }
  }
  // Check if the current score is >= to score's value for the player if it's true the Player win
  if (scorePlayer1.textContent >= score) {
    player1.classList.add('player--winner')
    dice.style.display = 'none'
    isPlaying = false
  } else if (scorePlayer2.textContent >= score) {
    player2.classList.add('player--winner')
    dice.style.display = 'none'
    isPlaying = false
  }
}

const newGame = () => {
  // Reset the game
  dice.style.display = 'none'
  player1.classList.remove('player--winner')
  player2.classList.remove('player--winner')
  scorePlayer1.textContent = 0
  scorePlayer2.textContent = 0
  currentScorePlayer1.textContent = 0
  currentScorePlayer2.textContent = 0
  isPlaying = true
  player1Turn()
}

rollDiceBtn.addEventListener('click', rollDice)
holdBtn.addEventListener('click', hold)
newGameBtn.addEventListener('click', newGame)
