const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

// variables auxiliares
const images = {
  bg: 'assets/Fondo.png',
  play1: 'assets/mario.png',
  play2: 'assets/player2.png',
  bloque: 'assets/bloque.png',
  html: 'assets/HTML.png',
  css: 'assets/CSS.jpg',
  nodejs: 'assets/nodejs.png',
  bootstrap: 'assets/Bootstrap.png',
  react: 'assets/react.png',
  logo: 'assets/Logo3.png',
}

let interval
const bloques = []
const habilidades = []
const friction = 0.8
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
      this.draw() //esto manda a llamar el metodo draw, no tienes que dibujar de nuevo aaca, para eso es ese metodo
      loadScreen()
    }
  }
  draw() {
    // no olvides el this, estas usando una propiedad de tu clase, no una variable

    ctx.drawImage(this.img, this.x, this.y, canvas.width, canvas.height)
  }
}

class Player {
  constructor(x, y, img) {
    this.x = x
    this.y = y
    this.width = 80
    this.height = 80
    this.player = new Image()
    this.player.src = img
    this.draw()
  }
  draw() {
    ctx.drawImage(this.player, this.x, this.y, this.width, this.height)
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
    this.draw()
  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
  }
}

class Skill {
  constructor(x, y, num) {
    this.x = x
    this.y = y
    this.height = 60
    this.width = 60
    this.num = this.num
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
const player1 = new Player(100, 120, images.play1)
const player2 = new Player(150, 120, images.play2)

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
}

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
  player1.draw()
  player2.draw()
  movePlayer1()
  movePlayer2()
  drawHabilidades()
  generateBloques()
  drawBloques()
}

function loadScreen() {
  const logo = new Image()
  logo.src = images.logo
  logo.onload = () => ctx.drawImage(logo, 0, 0, 600, 600)
}

function start() {
  interval = setInterval(update, 1000 / 60)
}

function generateBloques() {
  for (let i = 215; i < 600; i += 60) {
    for (let j = 0; j < 600; j += 60) {
    bloques.push(new Block(j, i))
    const num1 = Math.random()
    const num2 = Math.floor(Math.random() * (5 - 1) + 1)
    if (num1 < 0.5) {
      habilidades.push(new Skill(x, y, num2))
    }
  }
}
}

function drawBloques() {
  bloques.forEach((bloque) => bloque.draw())
}

function drawHabilidades() {
  habilidades.forEach((habilidad) => habilidades.draw())
}

document.addEventListener('keydown', ({ keyCode }) => {
  switch (keyCode) {
    case 13:
      return start()
      break
  }
})
