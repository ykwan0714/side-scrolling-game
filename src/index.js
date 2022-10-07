import Platform from './js/Platform'
import Player from './js/Player'
document.body.style.overflow = 'hidden'
const canvas = document.getElementById('canvas')
canvas.width = 1000 //window.innerWidth
canvas.height = 300 //window.innerHeight
canvas.style.border = `1px solid`

const ctx = canvas.getContext('2d')

const player = new Player(canvas)
// const platform = new Platform(canvas)
const platforms = [
  new Platform(canvas, { x: 200, y: 150 }),
  new Platform(canvas, { x: 500, y: 100 })
]

if (player) {
  window.addEventListener('keydown', ({ keyCode }) => {
    console.log(keyCode)
    switch (keyCode) {
      // case 38:
      case 32:
        console.log('[keydown] up', player.velocity.y)
        if (
          player.keys.up.pressed === false &&
          player.velocity.y === 0 // 바닥 인 경우에만 점프 가능
        ) {
          player.velocity.y -= 20
          player.keys.up.pressed = true
        }
        break
      case 39:
        console.log('[keydown] right')
        player.keys.right.pressed = true
        break
      case 40:
        console.log('[keydown] down')
        break
      case 37:
        console.log('[keydown] left')
        player.keys.left.pressed = true
        break
    }
  })
  window.addEventListener('keyup', ({ keyCode }) => {
    switch (keyCode) {
      //case 38:
      case 32:
        console.log('[keyup] up')
        player.keys.up.pressed = false
        break
      case 39:
        console.log('[keyup] right')
        player.keys.right.pressed = false
        break
      case 40:
        console.log('[keyup] down')
        break
      case 37:
        console.log('[keyup] left')
        player.keys.left.pressed = false
    }
  })

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    //  platform.draw() 플랫폼 그리기
    platforms.forEach((platform) => {
      platform.draw()
    })
    player.update()

    if (player.keys.right.pressed && player.position.x < 400) {
      player.velocity.x = 5
    } else if (player.keys.left.pressed && player.position.x > 100) {
      player.velocity.x = -5
    } else {
      player.velocity.x = 0
      // 배경이동
      if (player.keys.right.pressed) {
        // platform.position.x -= 5
        platforms.forEach((platform) => {
          platform.position.x -= 5
        })
      } else if (player.keys.left.pressed) {
        // platform.position.x += 5
        platforms.forEach((platform) => {
          platform.position.x += 5
        })
      }
    }

    // 플레이어와 플랫폼의 상호 작용
    const playerYAddHeight = player.position.y + player.height
    const playerXAddWidth = player.position.x + player.width
    platforms.forEach((platform) => {
      if (
        playerYAddHeight <= platform.position.y &&
        playerYAddHeight + player.velocity.y >= platform.position.y &&
        playerXAddWidth >= platform.position.x &&
        player.position.x <= platform.position.x + platform.width
      ) {
        player.velocity.y = 0
      }
    })

    requestAnimationFrame(animate)
  }
  animate()
}
