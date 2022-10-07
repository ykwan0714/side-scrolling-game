const gravity = 1
class Platform {
  constructor(canvas, { x, y }) {
    this.position = {
      x,
      y
    }

    this.width = 200
    this.height = 20
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
  }
  // 실제 player을 그리는 메서드
  draw() {
    if (this.ctx) {
      const { x, y } = this.position
      this.ctx.fillStyle = 'blue'
      this.ctx.fillRect(x, y, this.width, this.height)
    }
  }

  /*  // 플레이어의 한계값에 맞게 positon 상태를 갱신하는 메서드
  update() {
    if (this.position.y + this.height + this.velocity.y <= this.canvas.height) {
      this.velocity.y += gravity
    } else {
      // player가 바닥 (canvas Height에 닿으면 0)
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
  } */
}

export default Platform
