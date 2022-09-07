import Player from './js/Player'
document.body.style.overflow = 'hidden'
const canvas = document.getElementById('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const ctx = canvas.getContext('2d')

const player = new Player(canvas)

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  player.update()
  requestAnimationFrame(animate)
}

animate()
