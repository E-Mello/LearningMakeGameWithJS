import { desenhar } from "../app.js";
import personagem from "./character.js";
const animacao = {
  // Função para iniciar a animação
  iniciar() {
    this.loop();
  },

  // Loop de animação
  loop() {
    // Atualiza a posição do personagem
    personagem.atualizarPosicaoY();
    personagem.atualizarPosicaoX();

    // Desenha o jogo
    desenhar();

    // Solicita o próximo quadro de animação
    requestAnimationFrame(this.loop);
  },
};

export default animacao;
