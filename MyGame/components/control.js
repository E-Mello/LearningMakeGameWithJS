import personagem from "./character.js";
const controle = {
  // Função para adicionar ouvintes de eventos para teclas
  adicionarOuvintes() {
    window.addEventListener("keydown", this.tratarKeyDown);
    window.addEventListener("keyup", this.tratarKeyUp);
  },

  // Função para tratar o evento de tecla pressionada
  tratarKeyDown(event) {
    switch (event.key) {
      case "ArrowLeft":
        personagem.dx = -5;
        break;
      case "ArrowRight":
        personagem.dx = 5;
        break;
      case "ArrowUp":
      case " ":
        if (
          !personagem.pulando &&
          personagem.y === canvas.height - personagem.raio
        ) {
          personagem.pulando = true;
          personagem.dy = personagem.puloVelocidade;
        }
        break;
    }
  },

  // Função para tratar o evento de tecla solta
  tratarKeyUp(event) {
    switch (event.key) {
      case "ArrowLeft":
      case "ArrowRight":
        personagem.dx = 0;
        break;
    }
  },
};

export default controle;
