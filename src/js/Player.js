const gravity = 1
class Player {
  constructor(canvas) {
    this.position = {
      x: 100,
      y: 100
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
    this.width = 30
    this.height = 30
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')

    window.addEventListener('keydown', ({ keyCode }) => {
      switch (keyCode) {
        case 38:
          console.log('[keydown] up')
          if (
            this.keys.up.pressed === false &&
            this.position.y + this.height + this.velocity.y > this.canvas.height // 바닥 인 경우에만 점프 가능
          ) {
            this.velocity.y -= 20
            this.keys.up.pressed = true
          }
          break
        case 39:
          console.log('[keydown] right')
          this.keys.right.pressed = true
          break
        case 40:
          console.log('[keydown] down')
          break
        case 37:
          console.log('[keydown] left')
          this.keys.left.pressed = true
          break
      }
    })
    window.addEventListener('keyup', ({ keyCode }) => {
      switch (keyCode) {
        case 38:
          console.log('[keyup] up')
          this.keys.up.pressed = false
          break
        case 39:
          console.log('[keyup] right')
          this.keys.right.pressed = false
          break
        case 40:
          console.log('[keyup] down')
          break
        case 37:
          console.log('[keyup] left')
          this.keys.left.pressed = false
      }
    })
  }
  // 실제 player을 그리는 메서드
  draw() {
    if (this.ctx) {
      const { x, y } = this.position
      this.ctx.fillStyle = 'red'
      this.ctx.fillRect(x, y, this.width, this.height)
    }
  }

  // 플레이어의 한계값에 맞게 positon 상태를 갱신하는 메서드
  update() {
    if (this.position.y + this.height + this.velocity.y <= this.canvas.height) {
      this.velocity.y += gravity
    } else {
      this.velocity.y = 0
    }

    if (this.keys.right.pressed) {
      this.velocity.x = 5
    } else if (this.keys.left.pressed) {
      this.velocity.x = -5
    } else {
      this.velocity.x = 0
    }
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    this.draw()
  }
}

export default Player
