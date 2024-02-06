import { canvas } from "../app.js";
import cenario from "./scenario.js";
import { ctx } from "../app.js";
const personagem = {
  raio: 20,
  x: 0,
  y: 0,
  pontoInicialX: 0,
  pulando: false,
  puloVelocidade: 15,
  puloAltura: 50,
  dy: 0,
  aceleracaoGravitacional: 0.5,
  dx: 0,

  // Função para atualizar a posição y do personagem
  atualizarPosicaoY() {
    if (this.pulando) {
      this.y -= this.dy;
      this.dy -= this.aceleracaoGravitacional;

      if (this.y >= canvas.height - this.raio) {
        this.y = canvas.height - this.raio;
        this.pulando = false;
        this.dy = 0;
      }
    } else {
      this.dy += this.aceleracaoGravitacional;
      this.y += this.dy;

      if (this.y >= canvas.height - this.raio) {
        this.y = canvas.height - this.raio;
        this.dy = 0;
      }
    }
  },

  // Função para atualizar a posição x do personagem
  atualizarPosicaoX() {
    this.x += this.dx;

    // Verifica se ultrapassou a largura máxima à esquerda e redefine para o ponto inicial
    if (this.x - this.raio < 0) {
      this.x = this.raio;
    }
  },

  // Função para desenhar o personagem
  desenhar() {
    ctx.beginPath();
    ctx.arc(this.x - cenario.cameraX, this.y, this.raio, 0, Math.PI * 2);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
  },
};

export default personagem;
