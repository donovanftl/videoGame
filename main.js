const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

// variables auxiliares
const images = {
  bg: 'assets/Fondo.png',
  play1: 'assets/ms1.png',
  bloque: 'assets/bloque.png',
  html: '/assets/HTML.png',
  css: '/assets/CSS.jpg',
  nodejs: '/assets/nodejs.png',
  bootstrap: '/assets/Bootstrap.png',
}

let interval

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
  constructor() {
    this.x = 290
    this.y = 290
    this.width = 80
    this.height = 80
    this.img = new Image()
    this.img.src = images.play1
    this.draw()
  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
  }
  moveLeft() {
    this.x -= 20
  }
  moveRight() {
    this.x += 10
  }
  moveDown() {
    this.y += 10
  }
  moveUp() {
    this.y -= 10
  }
}

class Blocks {
  constructor() {
    this.x = 0
    this.y = 385
    this.width = 75
    this.height = 75
    this.img = new Image()
    this.img.src = images.bloque
    this.draw()
  }

  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
  }
}

// instancias
const bg = new Background()
const player = new Player()
const bloque = new Blocks()

// funciones principales
// Me salgo ya del live share, pero si necesitas algo me avisas.2d
// recomiendo que continues con las funciones de aca, el flujo start game y update.
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  bg.draw()
  player.draw()
  bloque.draw()
}

function loadScreen() {
  ctx.font = '25px Avenir'
  ctx.fillText('Press enter to start the game', 150, 300)
}

function start() {
  return (interval = setInterval(update, 1000 / 60))
}

// listeners
document.addEventListener('keydown', ({ keyCode }) => {
  switch (keyCode) {
    case 13:
      return start()
    case 37:
      player.moveLeft()
      break
    case 38:
      player.moveUp()
      break
    case 39:
      player.moveRight()
      break
    case 40:
      player.moveDown()
      break
  }
})
