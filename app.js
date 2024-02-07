// Cria um objeto para representar o character
const character = {
  raio: 20,
  x: 0,
  y: 0,
  pontoInicialX: 0,
  pulando: false,
  puloVelocidade: 10,
  puloAltura: 5,
  dy: 0,
  aceleracaoGravitacional: 0.3,
  dx: 0,
};

// Cria o estado do personagem, pra frente ou pra tras true or false
let characterState = true;

// Cria um objeto para representar o cenário
const cenario = {
  cameraX: 0,
  margemDireita: 0.35,
};

// Obtém o elemento canvas e seu contexto
const canvas = document.getElementById("meuCanvas");
const ctx = canvas.getContext("2d");

// Ajusta as dimensões do canvas para ocupar toda a tela
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Inicializa as propriedades do character
character.x = canvas.width / 2;
character.y = canvas.height - character.raio;
character.pontoInicialX = character.x;

// Carrega as imagens
let img01Front = new Image();
img01Front.src = "./resource/avatar/player/player-walk-000.png";
let img02Front = new Image();
img02Front.src = "./resource/avatar/player/player-walk-001.png";
let img01Back = new Image();
img01Back.src = "./resource/avatar/player/player-walk-back-000.png";
let img02Back = new Image();
img02Back.src = "./resource/avatar/player/player-walk-back-001.png";

let charImg = img01Front; // Inicializa com a imagem de frente

// Aguarda a imagem ser carregada antes de usá-la
charImg.onload = function () {
  // Agora você pode usar a imagem
  animar();
};

// Função para desenhar o personagem
function drawCharacter() {
  // Desenha a imagem
  ctx.drawImage(
    charImg,
    character.x - cenario.cameraX - character.raio,
    character.y - character.raio,
    character.raio * 2,
    character.raio * 2
  );
}

// Função para desenhar o chão
function drawFloor() {
  // Limpa o canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Desenha o chão (retângulo verde)
  ctx.fillStyle = "green";
  ctx.fillRect(-cenario.cameraX, canvas.height - 20, canvas.width, 20);
}

// Função para animar o círculo usando requestAnimationFrame
function animar() {
  // Atualiza a posição y do character
  if (character.pulando) {
    character.y -= character.dy;
    character.dy -= character.aceleracaoGravitacional;

    if (character.y >= canvas.height - character.raio) {
      character.y = canvas.height - character.raio;
      character.pulando = false;
      character.dy = 0;
    }
  } else {
    character.dy += character.aceleracaoGravitacional;
    character.y += character.dy;

    if (character.y >= canvas.height - character.raio) {
      character.y = canvas.height - character.raio;
      character.dy = 0;
    }
  }

  // Atualiza a posição x do character
  character.x += character.dx;

  // Verifica se ultrapassou a largura máxima à esquerda e redefine para o ponto inicial
  if (character.x - character.raio < 0) {
    character.x = character.raio;
  }

  // Calcula a margem direita em pixels
  const margemDireitaPixels = canvas.width * cenario.margemDireita;

  // Verifica se ultrapassou a largura máxima à direita e move a câmera
  if (character.x + character.raio + margemDireitaPixels > canvas.width) {
    cenario.cameraX =
      character.x - canvas.width + character.raio + margemDireitaPixels;
  }

  // Chama a função de desenho do chão
  drawFloor();
  // Chama a função de desenho do personagem
  drawCharacter();

  // Solicita o próximo quadro de animação
  requestAnimationFrame(animar);
}

function changeCharacterImage() {
  if (characterState == true) {
    if (charImg != img02Front) {
      charImg = img02Front;
    } else {
      charImg = img01Front;
    }
  } else {
    if (charImg != img02Back) {
      charImg = img02Back;
    } else {
      charImg = img01Back;
    }
  }
}

// Função para lidar com eventos de teclas
function handleKeyDown(event) {
  switch (event.key) {
    case "ArrowLeft":
      characterState = false;
      changeCharacterImage();
      character.dx = -2.5;
      break;
    case "ArrowRight":
      characterState = true;
      changeCharacterImage();
      character.dx = 2.5;
      break;
    case "ArrowUp":
    case " ":
      characterState = true;
      changeCharacterImage();
      if (
        !character.pulando &&
        character.y === canvas.height - character.raio
      ) {
        character.pulando = true;
        character.dy = character.puloVelocidade;
      }
      break;
  }
}

// Função para lidar com eventos de teclas soltas
function handleKeyUp(event) {
  switch (event.key) {
    case "ArrowLeft":
    case "ArrowRight":
      character.dx = 0;
      break;
  }
}

// Adiciona ouvintes de eventos para teclas pressionadas e soltas
window.addEventListener("keydown", handleKeyDown);
window.addEventListener("keyup", handleKeyUp);

// Inicia a animação
animar();
