import { canvas } from "../app.js";
import { ctx } from "../app.js";
const cenario = {
  cameraX: 0,
  margemDireita: 0.2,

  // Função para desenhar o chão
  desenharChao() {
    ctx.fillStyle = "green";
    ctx.fillRect(-cenario.cameraX, canvas.height - 20, canvas.width, 20);
  },
};

export default cenario;
