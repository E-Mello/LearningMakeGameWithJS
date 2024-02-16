const circle1 = { x: 10, y: 10, radius: 300 };
const circle2 = { x: 500, y: 500, radius: 150 };

// Calcula a posição horizontal entre os dois círculos (trangulo retângulo)
let dx = circle1.x - circle2.x;

// Calcula a posição vertical entre os dois círculos (trangulo retângulo)
let dy = circle1.y - circle2.y;

// Calcula a hipotenusa (teorema de pitágoras)
let distance = Math.sqrt(dx * dx + dy * dy);

// Calcula a soma dos raios dos dois círculos
let sumOfRadius = circle1.radius + circle2.radius;

if (distance < sumOfRadius) {
  console.log("Os círculos colidiram");
} else if (distance === sumOfRadius) {
  console.log("Os círculos se tocaram");
} else if (distance > sumOfRadius) {
  console.log("Os círculos não colidiram");
}
