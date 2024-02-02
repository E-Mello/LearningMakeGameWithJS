document.body.style.margin = "0";
document.body.style.padding = "0";

// Variables
let isJumping = false; // Adiciona uma flag para verificar se o personagem está pulando

import { createCharacter } from "./components/character";
import { createHtmlElement } from "./components/createHtmlElement";

const mainContent = createHtmlElement("canvas", "mainContent");
const ctx = mainContent.getContext("2d");
const player = createCharacter(
  "Player",
  100,
  10,
  "../resource/avatar/player/player-walk-000.png"
);
player.draw(ctx, 0, 0);
player.attack(player);
console.log(player.health);
function loadWorld() {
  mainContent.style.display = "flex";
  mainContent.width = window.innerWidth;
  mainContent.height = window.innerHeight;
  mainContent.style.border = "1px solid red";
  document.body.appendChild(mainContent);
}

function drawTheWorld() {
  ctx.clearRect(0, 0, mainContent.width, mainContent.height);
  player.draw(ctx, 0, 0);
  player.attack(player);
  console.log(player.health);
}

function characterMovement() {
  window.addEventListener("keydown", (event) => {
    const velocidade = 10; // character speed
    const posicaoAtualX = parseFloat(getComputedStyle(character).left);

    if (event.defaultPrevented) {
      return; // Do nothing if the event was already processed
    }
    switch (event.key) {
      case "ArrowLeft":
        charPosition = false;
        changeCharacterImage();
        character.style.left = posicaoAtualX - velocidade + "px";
        break;
      case "ArrowRight":
        charPosition = true;
        changeCharacterImage();
        character.style.left = posicaoAtualX + velocidade + "px";
        break;
      case "ArrowUp":
        charPosition = true;
        changeCharacterImage();
        jump();
        break;
      case " ":
        charPosition = true;
        changeCharacterImage();
        jump();
        break;
    }

    function jump() {
      isJumping = true; // Define a flag de pulo para verdadeiro
      const jumpHeight = 50; // altura do pulo
      let currentHeight = -650;

      // Cria um intervalo para a animação de pulo
      const jumpInterval = setInterval(() => {
        currentHeight += 100;
        character.style.bottom = currentHeight + "px";

        if (currentHeight >= jumpHeight) {
          clearInterval(jumpInterval); // Termina a animação de pulo

          // Cria um intervalo para a animação de queda
          const fallInterval = setInterval(() => {
            currentHeight += 10;
            character.style.bottom = currentHeight + "px";

            if (currentHeight == 0) {
              clearInterval(fallInterval); // Termina a animação de queda
              isJumping = false; // Define a flag de pulo para falso
            }
          }, 50);
        }
      }, 50);
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  loadWorld();
  drawTheWorld();
  characterMovement();
});
