import imgSpriteRunRight from '../../assets/images/spriteRunRight.png'
import imgSpriteStandRight from '../../assets/images/spriteStandRight.png'
import imgSpriteRunLeft from '../../assets/images/spriteRunLeft.png'
import imgSpriteStandLeft from '../../assets/images/spriteStandLeft.png'
import imgSpriteLeft from '../../assets/images/sprite-left.png'
import imgSpriteRight from '../../assets/images/sprite-right.png'
import { createImage } from '../index.js'
const gravity = 1
class Player {
  constructor(canvas, image) {
    this.speed = 10
    this.position = {
      x: 50,
      y: 50
    }
    this.velocity = {
      x: 0,
      y: 0
    }
    this.keys = {
      up: {
        pressed: false
      },
      left: {
        pressed: false
      },
      right: {
        pressed: false
      }
    }
    this.width = 77// 66 //30
    this.height = 68 //150 // 30
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.image = createImage(imgSpriteRight)
    this.frames = 0
    this.spirtes = {
      stand: {
        right: createImage(imgSpriteRight),
        left: createImage(imgSpriteLeft),
        cropWidth: this.width,
        width: this.width
      },
      run: {
        right: createImage(imgSpriteRight),
        left: createImage(imgSpriteLeft),
        cropWidth: this.width,
        width: this.width
      }
    }
    this.direction = 'right'
    //this.currentSprite = this.spirtes.stand.right
  }
  // 실제 player을 그리는 메서드
  draw() {
    if (this.ctx) {
      const { x, y } = this.position
      /*  this.ctx.fillStyle = 'red'
     this.ctx.fillRect(x, y, this.width, this.height) */
      // this.ctx.drawImage(this.image, x, y, this.width, this.height)
      let cropWidth = this.spirtes.stand.cropWidth
      let image  = this.spirtes.stand[this.direction]
      let width = this.width
      if (this.foo) {
        cropWidth = this.spirtes.run.cropWidth
        width = this.spirtes.run.width
        if (this.keys.left.pressed) {
          if (this.direction === 'right') this.frames = 0 // 방향 전환시 프레임 초기화
          image = this.spirtes.run.left
          this.direction = 'left'
        } else {
          if (this.direction === 'left') this.frames = 0  // 방향 전환시 프레임 초기화
          image = this.spirtes.run.right
          this.direction = 'right'
        }
      }

      this.ctx.drawImage(
        image,
        cropWidth * Math.floor(this.frames / 10),
        0,
        cropWidth, //??
        70,
        x,
        y,
        width,
        this.height
      )
    }
  }
  get foo() {
    return this.keys.left.pressed || this.keys.right.pressed
  }
  // 플레이어의 한계값에 맞게 positon 상태를 갱신하는 메서드
  update() {
    this.frames++
    if (this.frames > 35 && this.foo === false) {
      this.frames = 0
    } else if (this.frames > 29 && this.foo ){
      this.frames = 0
    }
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

   /*  if (this.position.y + this.height + this.velocity.y <= this.canvas.height) {
      this.velocity.y += gravity
    } else {
      // player가 바닥 (canvas Height에 닿으면 0)
      // this.velocity.y = 0 for death
    } */
  }
}

export default Player
