const squares = document.querySelectorAll('.square')
const mole = document.querySelector('.mole')
const timeLeft = document.querySelector('#time-left')
const score = document.querySelector('#score')
const startGameButton = document.getElementById('start-game')
let result = 0

squares.forEach(square => {square.addEventListener('click', hit)})
startGameButton.addEventListener('click', moveTarget)

 function randomSquare() {
     squares.forEach(square => {square.classList.remove('mole')})
     squares.forEach(square => {square.classList.remove('rat')})
     let randomPosition = squares[Math.floor(Math.random() * 9)]
     randomPosition.classList.add('mole')
     if(Math.floor(Math.random() * 9) > 7)
     {
        randomPosition.classList.remove('mole')
        randomPosition = squares[Math.floor(Math.random() * 9)]
        randomPosition.classList.add('rat')
     }
 }

function moveTarget(event) {
    var count = 59
    var timer = setInterval(function() {
        timeLeft.textContent = (count--);
        if(count == -1) { 
            clearInterval(timer) 
            clearInterval(moleInteraval)
            alert("GAME OVER")
            squares.forEach(square => {square.classList.remove('mole')})
            squares.forEach(square => {square.classList.remove('rat')})
        }
    }, 1000)
    var moleInteraval = setInterval(randomSquare, 410)
}

function hit(event) {
    if(event.target.classList.contains("mole"))
    {   
        result++
        score.innerHTML = result
    }
    else if(event.target.classList.contains("rat"))
    {   
        result--
        score.innerHTML = result
    }
}


