// ----------------- Global Variables -----------------
const mainContent = createHtmlElement("main", "main-content");
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
  character.style.position = "relative";
  character.style.width = "50px";
  character.style.height = "50px";
  character.style.backgroundImage =
    "url('../resource/avatar/player/player-walk-000.png')";
  character.style.backgroundSize = "cover";
  character.style.left = "0";
  character.style.bottom = "0";
  mainContent.appendChild(character);
}

function editMainContent() {
  mainContent.style.display = "flex";
  mainContent.style.width = "99vw";
  mainContent.style.maxWidth = "99vw";
  mainContent.style.height = "97vh";
  mainContent.style.maxHeight = "97vh";
  document.body.appendChild(mainContent);
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
  editMainContent();
  editCharacter();
}

// ----------------- Simple Functions -----------------

// ----------------- Complex Functions -----------------
function moveChracter() {
  window.addEventListener("keydown", (event) => {
    const velocidade = 10; // character speed
    const posicaoAtualX = parseFloat(getComputedStyle(character).left);
    const posicaoAtualY = parseFloat(getComputedStyle(character).top);

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
        character.style.top = posicaoAtualY - velocidade + "px";
        break;
      case "ArrowDown":
        charPosition = true;
        changeCharacterImage();
        character.style.top = posicaoAtualY + velocidade + "px";
        break;
    }
  });
}
// ----------------- Complex Functions -----------------

// Main Function
document.addEventListener("DOMContentLoaded", function () {
  backToStart();
  moveChracter();
});
