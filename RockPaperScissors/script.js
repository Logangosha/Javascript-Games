const computerChoiceDisplay = document.getElementById('computer-choice')
const userChoiceDisplay = document.getElementById('player-choice')
const resultDisplay = document.getElementById('result')
const possibleChoices = document.querySelectorAll('button')
let userChoice
let computerChoice
let result

possibleChoices.forEach(possibleChoice => possibleChoice.addEventListener('click', (e) => {
    userChoice = e.target.innerHTML
    userChoiceDisplay.innerHTML = userChoice
    generateComputerChoice()
    getResult()
}))

function generateComputerChoice() {
    const randomNumber = Math.floor(Math.random() * possibleChoices.length +1)
    console.log(randomNumber)
    if(randomNumber === 1)
    {
        computerChoice = "rock"
    }
    else if(randomNumber === 2)
    {
        computerChoice = "paper"
    }
    else
    {
        computerChoice = "scissors"
    }

    computerChoiceDisplay.innerHTML = computerChoice
}

function getResult() {
    if(userChoice === computerChoice) result = "draw"
    else if(userChoice === "paper"    && computerChoice === "rock") result = "player win!"
    else if(userChoice === "scissors"  && computerChoice === "rock") result = "player lost!"
    else if(userChoice === "rock"     && computerChoice === "paper") result = "player lost!"
    else if(userChoice === "rock"     && computerChoice === "scissors") result = "player win!"
    else if(userChoice === "scissors" && computerChoice === "paper") result = "player win!"
    else if(userChoice === "paper"    && computerChoice === "scissors") result = "player lost!"
    
    resultDisplay.innerHTML = result
}
