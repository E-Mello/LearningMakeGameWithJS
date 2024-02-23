/**@type {HTMLCanvasElement} */
export default class Player {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.states = [];
    this.currentState = this.states[0];
    this.image = dogImage;
    this.width = 200;
    this.height = 181.83;
    this.x = this.gameHeight * 0.5 - this.width * 0.5;
    this.y = this.gameHeight - this.height;
    this.frameX = 1;
    this.frameY = 6;
  }
  draw(context) {
    // o método de desenho carrega 9 argumentos (método completo), o primeiro é a imagem
    // o segundo e o terceiro é o pedaço em que estamos recortando, da sprite de animações
    // o quarto e o quinto é o tamanho do recorte
    // o sexto e o sétimo é onde queremos colocar a imagem recortada
    // o oitavo e o nono é qual o tamanho que a imagem após ser recortada vai ter
    context.drawImage(
      this.image,
      this.width * this.frameX,
      this.height * this.frameY,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
