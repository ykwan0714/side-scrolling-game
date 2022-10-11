import imgPlatform from '../assets/images/platform.png'
import imgPlatformSmallTall from '../assets/images/platformSmallTall.png'
import imgHill from '../assets/images/hills.png'
import imgBackground from '../assets/images/background.png'
import Platform from './js/Platform'
import Player from './js/Player'
import GenericObject from './js/GenericObject'

document.body.style.overflow = 'hidden'
const canvas = document.getElementById('canvas')
canvas.width = 1000 //window.innerWidth
canvas.height = 500 //window.innerHeight
canvas.style.border = `1px solid`

const init = async () => {
  const promises = []
  const images = [imgPlatform, imgHill, imgBackground, imgPlatformSmallTall]
  let loadedCount = 0
  const loadImage = (url) => {
    return new Promise((resolve) => {
      let image = new Image()
      image.onload = () => resolve()
      image.src = url
    })
  }

  images.forEach((img) => {
    promises.push(loadImage(img))
  })
  if (promises.length) {
    const rv = await Promise.all(promises).catch(() => {
      alert('error')
    })
    if (rv.length === images.length) {
      start()
    }
  }
}

const start = () => {
  const createImage = (imgSrc) => {
    const image = new Image()
    image.src = imgSrc
    return image
  }
  const platformImage = createImage(imgPlatform)
  const platformSmallTallImage = createImage(imgPlatformSmallTall)
  const floorY = 400
  // 플랫폼
  let platforms = []
  // 배경들
  let genericObjects = []
  const ctx = canvas.getContext('2d')
  let player
  let scrollOffest = 0 // player의 이동거리 추적

  const reset = () => {
    scrollOffest = 0
    player = new Player(canvas)
    // 플랫폼
    platforms = [
      new Platform(canvas, { x: -1, y: floorY, image: platformImage }),
      new Platform(canvas, {
        x: platformImage.width - 3,
        y: floorY,
        image: platformImage
      }),
      new Platform(canvas, {
        x: platformImage.width * 2 + 100,
        y: floorY - 200,
        image: platformSmallTallImage
      }),
      new Platform(canvas, {
        x: platformImage.width * 2 + 100,
        y: floorY,
        image: platformImage
      }),

    ]
    // 배경들
    genericObjects = [
      new GenericObject(canvas, {
        x: -1,
        y: -1,
        image: createImage(imgBackground)
      }),
      new GenericObject(canvas, {
        x: -1,
        y: -1,
        image: createImage(imgHill)
      })
    ]
  }
  reset()
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
      ctx.fillStyle = 'white'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // genericObject 그리기 (배경 등)
      genericObjects.forEach((genericObjects) => {
        genericObjects.draw()
      })
      //  platform.draw() 플랫폼 그리기
      platforms.forEach((platform) => {
        platform.draw()
      })

      player.update()

      if (player.keys.right.pressed && player.position.x < 400) {
        player.velocity.x =  player.speed
      } else if (player.keys.left.pressed && player.position.x > 100) {
        player.velocity.x = -player.speed
      } else {
        player.velocity.x = 0
        // 배경이동
        if (player.keys.right.pressed) {
          scrollOffest += player.speed //5
          genericObjects.forEach((genericObject) => {
            genericObject.position.x -= player.speed * .66 //3
          })
          platforms.forEach((platform) => {
            platform.position.x -= player.speed //5
          })
        } else if (player.keys.left.pressed) {
          scrollOffest -= 5
          genericObjects.forEach((genericObject) => {
            genericObject.position.x += player.speed * .66 //3
          })
          platforms.forEach((platform) => {
            platform.position.x += player.speed //5
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
      // win condition
      if (scrollOffest >= 2000) {
        console.log('you win')
      }
      if (player.position.y > canvas.height) {
        console.log('you lose')
        reset()
      }

      requestAnimationFrame(animate)
    }
    animate()
  }
}

init()
