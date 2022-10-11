class GenericObject {
  constructor(canvas, { x, y, image }) {
    this.position = {
      x,
      y
    }
    this.image = image
    this.width = image.width
    this.height = image.height

    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
  }

  draw() {
    if (this.ctx) {
      const { x, y } = this.position
      this.ctx.drawImage(this.image, x, y)
    }
  }
}

export default GenericObject
