document.querySelector("body").style.backgroundImage =
  "url('../assets/teste.png')";

document.addEventListener("DOMContentLoaded", function () {
  const personagem = document.getElementById("personagem");

  document.addEventListener("click", function (event) {
    const destinoX = event.clientX - personagem.clientWidth / 2;
    const destinoY = event.clientY - personagem.clientHeight / 2;

    moverPersonagem(destinoX, destinoY);
  });

  function moverPersonagem(destinoX, destinoY) {
    const velocidade = 0.3; // Velocidade do personagem
    const posicaoAtualX = parseFloat(getComputedStyle(personagem).left);
    const posicaoAtualY = parseFloat(getComputedStyle(personagem).top);

    const deltaX = destinoX - posicaoAtualX;
    const deltaY = destinoY - posicaoAtualY;

    const distancia = Math.hypot(deltaX, deltaY);

    const tempoTotal = distancia / velocidade;
    const startTime = performance.now();

    function animar(tempoAtual) {
      const tempoDecorrido = tempoAtual - startTime;
      const percentualCompleto = tempoDecorrido / tempoTotal;

      if (percentualCompleto < 1) {
        const passoX = deltaX * percentualCompleto;
        const passoY = deltaY * percentualCompleto;

        personagem.style.left = posicaoAtualX + passoX + "px";
        personagem.style.top = posicaoAtualY + passoY + "px";

        requestAnimationFrame(animar);
      } else {
        // Chegou ao destino
        personagem.style.left = destinoX + "px";
        personagem.style.top = destinoY + "px";
      }
    }

    requestAnimationFrame(animar);
  }
});
