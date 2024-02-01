// Libs
// Libs
// ----------------- Global Variables -----------------
document.body.style.margin = "0";
const mainContent = createHtmlElement("main", "main-content");
const floor = createHtmlElement("div", "floor");
const character = createHtmlElement("div", "character");
insertTheComponentsIntoTheWorld();
let charPosition = true;
// ----------------- Global Variables -----------------

// ----------------- Simple Functions -----------------
function backToStart() {
  character.style.left = "0";
  character.style.bottom = "0";
}

function createHtmlElement(tag, id) {
  const newElement = document.createElement(tag);
  newElement.id = id;
  return newElement;
}

function editCharacter() {
  character.style.position = "fixed";
  character.style.width = "40px";
  character.style.height = "40px";
  character.style.backgroundImage =
    "url('../resource/avatar/player/player-walk-000.png')";
  character.style.backgroundSize = "cover";
  character.style.left = "0";
  character.style.top = "86.7vh";
  mainContent.appendChild(character);
}

function editMainContent() {
  mainContent.style.display = "flex";
  mainContent.style.width = "100vw";
  mainContent.style.maxWidth = "100vw";
  mainContent.style.height = "100vh";
  mainContent.style.maxHeight = "100vh";
  mainContent.style.backgroundImage =
    'url("../resource/cenario/background_02.png"';
  mainContent.style.backgroundSize = "contain";
  document.body.appendChild(mainContent);
}

function editFloor() {
  floor.style.display = "flex";
  floor.style.width = "100vw";
  floor.style.alignItems = "end";
  floor.style.justifyContent = "end";
  mainContent.appendChild(floor);

  // Determine quantos blocos de terra cabem na largura da tela
  const numBlocks = Math.floor(window.innerWidth / 31); // Supondo que cada bloco tenha 32px de largura

  for (let i = 0; i < numBlocks; i++) {
    const simpleBlockOfEarth = createHtmlElement("div", "simpleBlockOfEarth");
    simpleBlockOfEarth.style.backgroundImage =
      'url("../resource/cenario/big-block-of-land.png")';
    simpleBlockOfEarth.style.backgroundSize = "cover";
    simpleBlockOfEarth.style.position = "fixed";
    simpleBlockOfEarth.style.width = "2rem";
    simpleBlockOfEarth.style.height = "7vh";
    simpleBlockOfEarth.style.left = `${i * 32}px`; // Posicione cada bloco de terra
    floor.appendChild(simpleBlockOfEarth);
  }
}

function changeCharacterImage() {
  const img01Front = 'url("../resource/avatar/player/player-walk-000.png")';
  const img02Front = 'url("../resource/avatar/player/player-walk-001.png")';
  const img01Back = 'url("../resource/avatar/player/player-walk-back-000.png")';
  const img02Back = 'url("../resource/avatar/player/player-walk-back-001.png")';

  if (charPosition == true) {
    if (character.style.backgroundImage != img02Front) {
      character.style.backgroundImage = img02Front;
    } else {
      character.style.backgroundImage = img01Front;
    }
  } else {
    if (character.style.backgroundImage != img02Back) {
      character.style.backgroundImage = img02Back;
    } else {
      character.style.backgroundImage = img01Back;
    }
  }
}

function insertTheComponentsIntoTheWorld() {
  document.body.style.overflow = "hidden";
  editMainContent();
  editFloor();
  editCharacter();
}

// ----------------- Simple Functions -----------------

// ----------------- Complex Functions -----------------
let isJumping = false; // Adiciona uma flag para verificar se o personagem está pulando
function moveChracter() {
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
// ----------------- Complex Functions -----------------

// Main Function
document.addEventListener("DOMContentLoaded", function () {
  backToStart();
  moveChracter();
});
