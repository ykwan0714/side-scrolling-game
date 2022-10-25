import imgPlatform from '../assets/images/platform.png'
import imgPlatformSmallTall from '../assets/images/platformSmallTall.png'
import imgHill from '../assets/images/hills.png'
import imgBackground from '../assets/images/background.png'
import imgSpriteRunRight from '../assets/images/spriteRunRight.png'
import imgSpriteStandRight from '../assets/images/spriteStandRight.png'
import imgSpriteRunLeft from '../assets/images/spriteRunLeft.png'
import imgSpriteStandLeft from '../assets/images/spriteStandLeft.png'
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
  const images = [
    imgPlatform,
    imgHill,
    imgBackground,
    imgPlatformSmallTall,
    imgSpriteRunRight,
    imgSpriteStandRight,
    imgSpriteRunLeft,
    imgSpriteStandLeft
  ]
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
    console.log(rv)
    if (rv.length === images.length) {
      console.log(rv.length, images.length)
      start()
    }
  }
}
const moveY = 5
const start = () => {
  const platformImage = createImage(imgPlatform)
  const platformSmallTallImage = createImage(imgPlatformSmallTall)
  const floorY = 400 // 바닥 기준 점

  // 플랫폼
  let platforms = []
  // 배경들
  let genericObjects = []
  const ctx = canvas.getContext('2d')
  let player
  let scrollX = 0 // player의 이동거리 추적

  const reset = () => {
    scrollX = 0
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
      new Platform(canvas, {
        x: platformImage.width * 3 + 300,
        y: floorY - 100,
        image: platformSmallTallImage
      }),
      new Platform(canvas, {
        x: platformImage.width * 4 + 300,
        y: floorY - 100,
        image: platformSmallTallImage
      }),

      new Platform(canvas, {
        x: platformImage.width * 5 + 300,
        y: floorY - 100,
        image: platformSmallTallImage
      }),
      new Platform(canvas, {
        x: platformImage.width * 6 + 200,
        y: floorY - 200,
        image: platformSmallTallImage
      }),

      new Platform(canvas, {
        x: platformImage.width * 6 + 600,
        y: floorY - 600,
        image: platformSmallTallImage
      }),
      new Platform(canvas, {
        x: platformImage.width * 6 + 400,
        y: floorY - 400,
        image: platformSmallTallImage
      }),
      new Platform(canvas, {
        x: platformImage.width * 6 + 100,
        y: floorY,
        image: platformImage
      })
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


      // 400이 기준 점
      if (player.keys.right.pressed && player.position.x < 400) {
        // 오른쪽 이동
        player.velocity.x = player.speed
      } else if (
        player.keys.left.pressed &&
        (player.position.x >= 400 || (scrollX === 0 && player.position.x > 0)) // 왼쪽 이동
      ) {
        player.velocity.x = -player.speed
      } else {
        player.velocity.x = 0

        // 배경이동
        if (player.keys.right.pressed) {
          scrollX += player.speed //5
          genericObjects.forEach((genericObject) => {
            genericObject.position.x -= player.speed * 0.66 //3
          })
          platforms.forEach((platform) => {
            platform.position.x -= player.speed //5
          })
        } else if (player.keys.left.pressed && scrollX > 0) {
          // 배경이 움직인 경우에만 플랫폼을 이동해야한다.
          scrollX -= player.speed
          genericObjects.forEach((genericObject) => {
            genericObject.position.x += player.speed * 0.66 //3
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
          playerXAddWidth - 20 >= platform.position.x &&
          player.position.x <= platform.position.x - 20 + platform.width
        ) {
          player.velocity.y = 0
        }
      })

      // 서있다가 달리기 프레임 0 초기화
      /*
        if(currentKey === 'right' && player.currentSprite !== player.sprites.run.right) {
          player.frames = 1
          player.currentSprite = player.sprites.run.right
        }
      */
      // win condition
      if (scrollX >= 2000) {
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

export const createImage = (imgSrc) => {
  const image = new Image()
  image.src = imgSrc
  return image
}
