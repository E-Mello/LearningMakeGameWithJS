// Cria um objeto para representar o character
const character = {
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
};

// Cria um objeto para representar o cenário
const cenario = {
  cameraX: 0,
  margemDireita: 0.2,
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

// Função para desenhar o círculo na tela
function drawCharacter() {
  // Limpa o canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Desenha o chão (retângulo verde)
  ctx.fillStyle = "green";
  ctx.fillRect(-cenario.cameraX, canvas.height - 20, canvas.width, 20);

  // Desenha o círculo
  ctx.beginPath();
  ctx.arc(
    character.x - cenario.cameraX,
    character.y,
    character.raio,
    0,
    Math.PI * 2
  );
  ctx.fillStyle = "blue";
  ctx.fill();
  ctx.closePath();
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

  // Chama a função de desenho
  drawCharacter();

  // Solicita o próximo quadro de animação
  requestAnimationFrame(animar);
}

// Função para lidar com eventos de teclas
function handleKeyDown(event) {
  switch (event.key) {
    case "ArrowLeft":
      character.dx = -5;
      break;
    case "ArrowRight":
      character.dx = 5;
      break;
    case "ArrowUp":
    case " ":
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
