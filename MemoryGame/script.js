const cardArray = [
    {
        name: 'fries',
        img: "images/fries.png",
    },
    {
        name: 'cheeseburger',
        img: "images/cheeseburger.png",
    },
    {
        name: 'hotdog',
        img: "images/hotdog.png",
    },
    {
        name: 'ice-cream',
        img: "images/ice-cream.png",
    },
    {
        name: 'milkshake',
        img: "images/milkshake.png",
    },
    {
        name: 'pizza',
        img: "images/pizza.png",
    },
    {
        name: 'fries',
        img: "images/fries.png",
    },
    {
        name: 'cheeseburger',
        img: "images/cheeseburger.png",
    },
    {
        name: 'hotdog',
        img: "images/hotdog.png",
    },
    {
        name: 'ice-cream',
        img: "images/ice-cream.png",
    },
    {
        name: 'milkshake',
        img: "images/milkshake.png",
    },
    {
        name: 'pizza',
        img: "images/pizza.png",
    },
]

cardArray.sort(() => {
    let rand = Math.random()
    let res = 0.5 - rand
    return res
})

let score = 0
const gridDisplay = document.querySelector('#grid')
let cardsChosen = []
let cardsChosenIds = []
var cardsWon = []
var cardsWonId = []

function createBoard() {
    for(let i = 0; i < cardArray.length; i++)
    {
        const card = document.createElement('img')
        card.setAttribute('src', 'images/blank.png')
        card.setAttribute('id', i)
        card.addEventListener('click', flipCard)
        card.addEventListener('mouseover', imageGainFocus)
        card.addEventListener('mouseleave', imageLoseFocus)
        gridDisplay.appendChild(card)
    }
}

function imageGainFocus(){
    let id = this.getAttribute('id')
    var alreadyMached = false
    for(var i = 0; i < cardsWonId.length; i++)
    {
        for(var j = 0; j < 2; j++)
        {
            if(parseInt(id) === parseInt(cardsWonId[i][j])) {
                alreadyMached = true
                break
            }
        }
    }
    if(alreadyMached) {
        this.style.border = "0px solid red"
    }
    else {
        this.style.border = "5px solid red"
    }
}
function imageLoseFocus(){
    this.style.border = "0px solid red"
}

function flipCard(){
    const cardId = this.getAttribute('id')
    cardsChosen.push(cardArray[cardId].name)
    cardsChosenIds.push(cardId)
    this.setAttribute('src', cardArray[cardId].img)
    // I want to add a border to the selected image then when the card is a match the image remights but the card does not have a border

    if(cardsChosen.length === 2)
    {
        score++
        document.getElementById("result").innerHTML = score
        setTimeout(checkMatch, 200)
    }
}

function checkMatch(){
    const cards = document.querySelectorAll('#grid img')
    const optionOneId = cardsChosenIds[0]
    const optionTwoId = cardsChosenIds[1]
    if(optionOneId === optionTwoId){
        alert('You have clicked the same image twice!')
        cards[optionOneId].setAttribute('src', 'images/blank.png')
    }
    else {
        if(cardsChosen[0] === cardsChosen[1]) {
            alert('You have found a match')
            // cards[optionOneId].setAttribute('src', 'images/white.png')
            // cards[optionTwoId].setAttribute('src', 'images/white.png')
            cards[optionOneId].removeEventListener('click', flipCard)
            cards[optionTwoId].removeEventListener('click', flipCard)
            cardsWon.push(cardsChosen)
            cardsWonId.push(cardsChosenIds)
        }
        else {
            cards[optionOneId].setAttribute('src', 'images/blank.png')
            cards[optionTwoId].setAttribute('src', 'images/blank.png')
        }
    }
    cardsChosen = []
    cardsChosenIds = []
}
createBoard()