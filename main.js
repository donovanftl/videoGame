const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

// variables auxiliares
const images = {
  bg: 'assets/Fondo.png',
  play1: 'assets/mario.png',
  play2: 'assets/player2.png',
  bloque: 'assets/bloque.png',
  html: 'assets/HTML.png',
  css: 'assets/logo-css-png-5.png',
  nodejs: 'assets/nodejs.png',
  bootstrap: 'assets/Bootstrap.png',
  react: 'assets/react.png',
  logo: 'assets/Logo3.png',
  play1wins: 'assets/player1wins.png',
  play2wins: 'assets/player2wins.png'
}

let interval
const bloques = []
const habilidades = []
const keys = []

// clases
class Background {
  constructor() {
    this.x = 0
    this.y = 0
    this.width = canvas.width
    this.height = canvas.height
    this.img = new Image()
    this.img.src = images.bg
    this.img.onload = () => {
      this.draw()
      loadScreen()
    }
  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y, canvas.width, canvas.height)
  }
}

class Player {
  constructor(x, y, img) {
    this.x = x
    this.y = y
    this.width = 60
    this.height = 60
    this.points = 0
    this.player = new Image()
    this.player.src = img
    this.draw()
  }
  isTouching(bloque) {
    if (
      bloque.x < this.x + this.width &&
      bloque.x + bloque.width > this.x &&
      bloque.y < this.y + this.height &&
      bloque.height + bloque.y > this.y
    )
      return true
  }
  draw() {
    ctx.drawImage(this.player, this.x, this.y, this.width, this.height)
  }
}

class Block {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.width = 60
    this.height = 60
    this.img = new Image()
    this.img.src = images.bloque
  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
  }
}

class Skill {
  constructor(x, y, num) {
    this.istouched = false
    this.x = x
    this.y = y
    this.height = 45
    this.width = 45
    this.num = num
    this.html = new Image()
    this.html.src = images.html
    this.css = new Image()
    this.css.src = images.css
    this.nodejs = new Image()
    this.nodejs.src = images.nodejs
    this.bootstrap = new Image()
    this.bootstrap.src = images.bootstrap
    this.react = new Image()
    this.react.src = images.react
  }
  draw() {
    switch (this.num) {
      case 1:
        ctx.drawImage(this.html, this.x, this.y, this.width, this.height)
        break
      case 2:
        ctx.drawImage(this.css, this.x, this.y, this.width, this.height)
        break
      case 3:
        ctx.drawImage(this.nodejs, this.x, this.y, this.width, this.height)
        break
      case 4:
        ctx.drawImage(this.bootstrap, this.x, this.y, this.width, this.height)
        break
      case 5:
        ctx.drawImage(this.react, this.x, this.y, this.width, this.height)
    }
  }
}

// instancias
const bg = new Background()
const player1 = new Player(100, 150, images.play1)
const player2 = new Player(300, 150, images.play2)

// funciones principales
function movePlayer1() {
  if (keys[68]) {
    player1.x++
  }

  if (keys[65]) {
    player1.x--
  }

  if (keys[83]) {
    player1.y++
  }

  if (keys[87]) {
    player1.y--
  }
}

function movePlayer2() {
  if (keys[39]) {
    player2.x++
  }

  if (keys[37]) {
    player2.x--
  }

  if (keys[40]) {
    player2.y++
  }

  if (keys[38]) {
    player2.y--
  }
}setInterval

//para movimiento
document.body.addEventListener('keydown', (e) => {
  keys[e.keyCode] = true
})

//para movimiento
document.body.addEventListener('keyup', (e) => {
  keys[e.keyCode] = false
})

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  bg.draw()
  drawHabilidades()
  player1.draw()
  player2.draw()
  movePlayer1()
  movePlayer2()
  drawBloques()
  checkCollisions()
  whoWins()
}

function loadScreen() {
  const logo = new Image()
  logo.src = images.logo
  logo.onload = () => ctx.drawImage(logo, 0, 0, 600, 635)
}

function start() {
  generateBloques()
  if (interval) return
  interval = setInterval(update, 1000 / 60)
}

function generateBloques() {
  for (let i = 215; i < 600; i += 60) {
    for (let j = 0; j < 600; j += 60) {
      const num = Math.floor(Math.random() * (5 - 1) + 1)
      if (Math.random() > 0.5) {
        habilidades.push(new Skill(j, i, num))
        bloques.push(new Block(j, i))
      } else {
        bloques.push(new Block(j, i))
      }
    }
  }
}

function drawBloques() {
  bloques.forEach((bloque) => bloque.draw())
}

function drawHabilidades() {
  habilidades.forEach((habilidad) => habilidad.draw())
}

function checkCollisions() {
  bloques.forEach((bloque, index) => {
    if (player1.isTouching(bloque)) {
      bloques.splice(index, 1)
    }
    if (player2.isTouching(bloque)) {
      bloques.splice(index, 1)
    }
    ctx.font = '20px Avenir'
    ctx.fillText('Score: ' + player1.points, 8, 20)
    ctx.fillText('Score: ' + player2.points, 500, 20)
  })
  habilidades.forEach((skill) => {
    if (player1.isTouching(skill) && !skill.istouched) {
      player1.points++
      skill.istouched = true
    }
    if (player2.isTouching(skill) && !skill.istouched) {
      player2.points++
      skill.istouched = true
    }
  })
}

function whoWins() {
  // console.log(bloques === ![])
  if (bloques == ![]) {
    if (player1.points > player2.points) {
      const play1wins = new Image()
      play1wins.src = images.play1wins
      play1wins.onload = () => ctx.drawImage(play1wins, 225, 200, 200, 250)
    } else if (player1.points < player2.points) {
      const play2wins = new Image()
      play2wins.src = images.play2wins
      play2wins.onload = () => ctx.drawImage(play2wins, 225, 200, 200, 250)
    } else {
      ctx.font = '25px Avenir'
      ctx.fillText('Tie', 100, 300)
    }
    gameOver()
  }
}
function gameOver() {
  clearInterval(interval)
}

document.addEventListener('keydown', ({ keyCode }) => {
  switch (keyCode) {
    case 13:
      return start()
      break
  }
})
