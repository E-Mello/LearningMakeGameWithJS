// Cria um objeto para representar o personagem
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

// Inicializa as propriedades do personagem
personagem.x = canvas.width / 2;
personagem.y = canvas.height - personagem.raio;
personagem.pontoInicialX = personagem.x;

// Função para desenhar o círculo na tela
function desenharCirculo() {
  // Limpa o canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Desenha o chão (retângulo verde)
  ctx.fillStyle = "green";
  ctx.fillRect(-cenario.cameraX, canvas.height - 20, canvas.width, 20);

  // Desenha o círculo
  ctx.beginPath();
  ctx.arc(
    personagem.x - cenario.cameraX,
    personagem.y,
    personagem.raio,
    0,
    Math.PI * 2
  );
  ctx.fillStyle = "blue";
  ctx.fill();
  ctx.closePath();
}

// Função para animar o círculo usando requestAnimationFrame
function animar() {
  // Atualiza a posição y do personagem
  if (personagem.pulando) {
    personagem.y -= personagem.dy;
    personagem.dy -= personagem.aceleracaoGravitacional;

    if (personagem.y >= canvas.height - personagem.raio) {
      personagem.y = canvas.height - personagem.raio;
      personagem.pulando = false;
      personagem.dy = 0;
    }
  } else {
    personagem.dy += personagem.aceleracaoGravitacional;
    personagem.y += personagem.dy;

    if (personagem.y >= canvas.height - personagem.raio) {
      personagem.y = canvas.height - personagem.raio;
      personagem.dy = 0;
    }
  }

  // Atualiza a posição x do personagem
  personagem.x += personagem.dx;

  // Verifica se ultrapassou a largura máxima à esquerda e redefine para o ponto inicial
  if (personagem.x - personagem.raio < 0) {
    personagem.x = personagem.raio;
  }

  // Calcula a margem direita em pixels
  const margemDireitaPixels = canvas.width * cenario.margemDireita;

  // Verifica se ultrapassou a largura máxima à direita e move a câmera
  if (personagem.x + personagem.raio + margemDireitaPixels > canvas.width) {
    cenario.cameraX =
      personagem.x - canvas.width + personagem.raio + margemDireitaPixels;
  }

  // Chama a função de desenho
  desenharCirculo();

  // Solicita o próximo quadro de animação
  requestAnimationFrame(animar);
}

// Função para lidar com eventos de teclas
function handleKeyDown(event) {
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
}

// Função para lidar com eventos de teclas soltas
function handleKeyUp(event) {
  switch (event.key) {
    case "ArrowLeft":
    case "ArrowRight":
      personagem.dx = 0;
      break;
  }
}

// Adiciona ouvintes de eventos para teclas pressionadas e soltas
window.addEventListener("keydown", handleKeyDown);
window.addEventListener("keyup", handleKeyUp);

// Inicia a animação
animar();
