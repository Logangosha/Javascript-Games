const grid = document.querySelector('.grid')
const blockWidth = 100
const blockHeight = 20
const boardWidth = 560
const boardHeight = 300
const ballDiameter = 20
let currentDirection = 'upRight'
let xDirection = 2
let yDirection = 2
let timerId
let blockAreas = []


const userStart = [230, 10]
let currentPosition = userStart
const ballStart = [270, 40]
let ballPosition = ballStart

//create Block
class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis,yAxis]
        this.bottomRight = [xAxis + blockWidth, yAxis]
        this.topLeft = [xAxis, yAxis + blockHeight]
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
        blockAreas.push([this.bottomLeft, this.bottomRight, this.topLeft, this.topRight])
    }
}

//all my blocks
const blocks = [
    new Block(10,270),
    new Block(120,270),
    new Block(230,270),
    new Block(340,270),
    new Block(450,270),

    new Block(10,240),
    new Block(120,240),
    new Block(230,240),
    new Block(340,240),
    new Block(450,240),

    new Block(10,210),
    new Block(120,210),
    new Block(230,210),
    new Block(340,210),
    new Block(450,210),
]

//draw all of my blocks
function addBlocks() {
    for(let i = 0; i < blocks.length; i++) {
        const block = document.createElement('div')
        block.classList.add('block')
        block.style.left = blocks[i].bottomLeft[0] + 'px'
        block.style.bottom = blocks[i].bottomLeft[1] + 'px'
        grid.appendChild(block) 
    }
}

addBlocks()

// add user
const user = document.createElement('div')
user.classList.add('block')
user.classList.add('user')
drawUser()
grid.appendChild(user)

// draw the user
function drawUser() {
    user.style.left = currentPosition[0] + 'px'
    user.style.bottom = currentPosition[1] + 'px'
}

//draw the ball
function drawBall() {
    ball.style.left = ballPosition[0] + 'px'
    ball.style.bottom = ballPosition[1] + 'px'
}

// move ball
function moveBall() {
    ballPosition[0] += xDirection
    ballPosition[1] += yDirection
    drawBall()
    checkForCollisions()
}

timerId = setInterval(moveBall, 10)


// check for collisions
function checkForCollisions() {
    
    //console.log("x position of ball = " + ballPosition[0] + "  x position range of user " + currentPosition[0] + " - " + (currentPosition[0]+ blockWidth) +" | " + ballPosition[1] + " " + (currentPosition[1] + blockHeight )  )
    // check for wall collisions
    if(ballPosition[0] + ballDiameter >= boardWidth){
        changeDirection('right')
    }
    else if(ballPosition[0] <= 0)
    {
        changeDirection('left')
    }
    else if(ballPosition[1] <= 0)
    {
        clearInterval(timerId)
        alert("You lose!")
    }
    else if(ballPosition[1] + ballDiameter >= boardHeight)
    {
        changeDirection('top')
    }  
    // check for user collisions
    if(ballPosition[1] === currentPosition[1] + blockHeight && ballPosition[0] <= currentPosition[0] + blockWidth && ballPosition[0] + ballDiameter >= currentPosition[0]) {
        console.log("collision")
        changeDirection('bottom')
    }
    else if(ballPosition[1] <= currentPosition[1] + blockHeight && ballPosition[1] + ballDiameter >= currentPosition[1] && ballPosition[0] + ballDiameter === currentPosition[0]) {
        changeDirection('right')
    }
    else if(ballPosition[1] <= currentPosition[1] + blockHeight && ballPosition[1] + ballDiameter >= currentPosition[1] && ballPosition[0] === currentPosition[0] + blockWidth) {
        changeDirection('left')
    } // check for block collisions
    for(let i = 0; i < blockAreas.length; i++) {
        if(ballPosition[0] <= blockAreas[i][1][0] && ballPosition[0] + ballDiameter >= blockAreas[i][0][0] && ballPosition[1] + ballDiameter === blockAreas[i][0][1]) {
            changeDirection("top")
            removeBlock(i)
        }
        else if(ballPosition[0] >= blockAreas[i][0][0] && ballPosition[0] + ballDiameter <= blockAreas[i][1][0] && ballPosition[1] === blockAreas[i][0][1]) {
            changeDirection("bottom")
            removeBlock(i)
        }
        else if(ballPosition[0] === blockAreas[i][1][0] && ballPosition[1] + ballDiameter >= blockAreas[i][1][1] && ballPosition[1] <= blockAreas[i][2][1]) {
            changeDirection("left")
            removeBlock(i)
        }
        else if(ballPosition[0] + ballDiameter === blockAreas[i][0][0] && ballPosition[1] + ballDiameter >= blockAreas[i][0][1] && ballPosition[1] <= blockAreas[i][2][1]) {
            changeDirection("right")
            removeBlock(i)
        }
    }
}

console.log(blockAreas[blockAreas.length -1][0][0]);

function removeBlock(i){
        blockAreas.splice(blockAreas.indexOf(blockAreas[i]), 1)
        grid.removeChild(grid.childNodes[i])
}

function changeDirection(hitLocation) {
    if(hitLocation === 'right' && currentDirection === 'upRight') {
        currentDirection = 'upLeft'
        xDirection = -2
        yDirection = 2
    }
    else if(hitLocation === 'right' && currentDirection === 'downRight') {
        currentDirection = 'downLeft'
        xDirection = -2
        yDirection = -2
    }
    else if(hitLocation === 'left' && currentDirection === 'upLeft') {
        currentDirection = 'upRight'
        xDirection = 2
        yDirection = 2
    }
    else if(hitLocation === 'left' && currentDirection === 'downLeft') {
        currentDirection = 'downRight'
        xDirection = 2
        yDirection = -2
    }
    else if(hitLocation === 'top' && currentDirection === 'upRight') {
        currentDirection = 'downRight'
        xDirection = 2
        yDirection = -2
    }
    else if(hitLocation === 'top' && currentDirection === 'upLeft') {
        currentDirection = 'downLeft'
        xDirection = -2
        yDirection = -2
    }
    else if(hitLocation === 'bottom' && currentDirection === 'downRight') {
        currentDirection = 'upRight'
        xDirection = 2
        yDirection = 2
    }
    else if(hitLocation === 'bottom' && currentDirection === 'downLeft') {
        currentDirection = 'upLeft'
        xDirection = -2
        yDirection = 2
    }
    
}

// move user
function moveUser(e) {
    switch(e.key) {
        case 'ArrowLeft':
            if(currentPosition[0] > 0) {
            currentPosition[0] -= 10
            drawUser()
        }
            break;
        case 'ArrowRight':
            if(currentPosition[0] + blockWidth < boardWidth) {
            currentPosition[0] += 10
            drawUser()
            }
        break;
    }
}

document.addEventListener('keydown', moveUser)

// add ball
const ball = document.createElement('div')
ball.classList.add('ball')
ball.style.left = ballPosition[0] + 'px'
ball.style.bottom = ballPosition[1] + 'px'
grid.appendChild(ball)
