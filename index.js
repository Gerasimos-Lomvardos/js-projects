'use strict'

const checkButton = document.querySelector('.check')
const againButton = document.querySelector('.again')
const guessNumber = document.querySelector('.number')
let scoreMessage = document.querySelector('.score')
let highscore = document.querySelector('.highscore')

let score = 20

let randomNum = Math.floor(Math.random() * 20) + 1

const displayMessage = message => {
  document.querySelector('.message').textContent = message
}

const checkHandler = () => {
  const guess = Number(document.querySelector('.guess').value)

  // When there is no or invalid input
  if (!guess || guess < 0 || guess > 20) {
    displayMessage('⛔ Number must be between 1-20!')
  }
  // When secret number is too low or too high
  else if (guess !== randomNum) {
    displayMessage(guess < randomNum ? 'Too low!' : 'Too high!')
    score--
    scoreMessage.textContent = score
  }
  // When player wins
  else if (guess === randomNum) {
    displayMessage('🎉 Correct Number')
    guessNumber.textContent = guess
    highscore.textContent =
      scoreMessage.textContent > highscore.textContent
        ? scoreMessage.textContent
        : highscore.textContent
    document.body.style.background = 'green'
    checkButton.setAttribute('disabled', 'true')
  }

  // When the score is 0
  if (score === 0) {
    displayMessage('You lost the game!')
    checkButton.setAttribute('disabled', 'true')
  }
}

const resetHandler = () => {
  randomNum = Math.floor(Math.random() * 20) + 1
  score = 20
  guessNumber.textContent = '?'
  scoreMessage.textContent = score
  document.querySelector('.guess').value = ''
  document.body.style.background = '#222'
  checkButton.removeAttribute('disabled')
  displayMessage('Start guessing...')
}

againButton.addEventListener('click', resetHandler)
checkButton.addEventListener('click', checkHandler)
