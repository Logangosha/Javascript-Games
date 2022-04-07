const test = document.getElementById('test')
test.innerHTML = getRandomInt(10)

function getRandomInt(max) {
    return Math.floor(Math.random()*max)+1;
  }