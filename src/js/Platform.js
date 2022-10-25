class Platform {
  constructor(canvas, { x, y, image }) {
    this.position = {
      x,
      y,
      originY: y
    }
    this.image = image
    this.width = image.width // 200
    this.height = 20 // 20

    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
  }
  draw() {
    if (this.ctx) {
      const { x, y } = this.position
      // this.ctx.fillStyle = 'blue'
      // this.ctx.fillRect(x, y, this.width, this.height)
      this.ctx.drawImage(this.image, x, y)
    }
  }
}

export default Platform
