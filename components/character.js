export function createCharacter(name, health, strength, imageUrl) {
  let image = new Image();
  image.src = imageUrl;

  image.onload = function () {
    return {
      name: name,
      health: health,
      strength: strength,
      image: image,
      attack: function (target) {
        target.health -= this.strength;
      },
      draw: function (ctx, x, y) {
        ctx.drawImage(this.image, x, y);
      },
    };
  };
}
