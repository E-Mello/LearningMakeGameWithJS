export class Player {
  constructor(game) {
    this.game = game;
    this.width = 100;
    this.height = 91.3;
    this.x = 0;
    this.y = this.game.height - this.height;
    this.image = player; // javascript pega automaticamente a imagem do arquivo player.png pelo ID
    this.speed = 0;
    this.maxSpeed = 10;
  }
  update(input) {
    if (input.includes("ArrowRight")) this.x++;
    else if (input.includes("ArrowLeft")) this.x--;
  }
  draw(context) {
    context.drawImage(
      this.image,
      0,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
