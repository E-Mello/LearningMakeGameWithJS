/** @type {HTMLCanvasElement} */

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 700;

// ctx.fillStyle = "white";
// ctx.fillRect(50, 50, 100, 150);
const explosions = [];

// getBoudingClientRect returns the size of an element and its position relative to the viewport
let canvasPosition = canvas.getBoundingClientRect();

class Explosion {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.spriteWidth = 200;
    this.spriteHeight = 179;
    this.width = this.spriteWidth / 2;
    this.height = this.spriteHeight / 2;
    this.image = new Image();
    this.image.src = "./files/boom.png";
    this.frame = 0;
  }
  update() {
    this.frame++;
  }
  draw() {
    // ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
    ctx.drawImage(
      this.image,
      this.spriteWidth * this.frame,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

window.addEventListener("click", function (e) {
  ctx.fillStyle = "white";
  ctx.fillRect(
    e.x - canvasPosition.left - 25,
    e.y - canvasPosition.top - 25,
    50,
    50
  );
});
