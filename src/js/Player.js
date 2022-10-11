const gravity = 1
class Player {
  constructor(canvas) {
    this.speed = 10
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
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    if (this.position.y + this.height + this.velocity.y <= this.canvas.height) {
      this.velocity.y += gravity
    } else {
      // player가 바닥 (canvas Height에 닿으면 0)
      // this.velocity.y = 0 for death
    }
  }
}

export default Player
