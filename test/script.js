var start = null;
var element = document.getElementById("ElementoQueVcQuerAnimar");
element.style.position = "absolute";

function step(timestamp) {
  if (!start) start = timestamp;
  var progress = timestamp - start;
  element.style.left = Math.min(progress / 10, 200) + "px";
  if (progress < 2000) {
    window.requestAnimationFrame(step);
  }
}

window.requestAnimationFrame(step);

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let start, previousTimeStamp;

function draw(timeStamp) {
  if (start === undefined) {
    start = timeStamp;
  }
  const elapsed = timeStamp - start;

  // Limpa o canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Desenha um retângulo que se move para a direita
  const x = elapsed * 0.1;
  ctx.fillRect(x, 0, 100, 100);

  // Se o retângulo ainda não saiu do canvas, desenha o próximo quadro
  if (x < canvas.width) {
    window.requestAnimationFrame(draw);
  }
}

window.requestAnimationFrame(draw);
