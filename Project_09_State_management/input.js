export default class InputHandler {
  constructor() {
    this.lastkey = "";
    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "ArrowLeft":
          this.lastkey = "PRESS left";
          break;
        case "ArrowRight":
          this.lastkey = "PRESS ArrowRight";
          break;
        case "ArrowUp":
          this.lastkey = "PRESS ArrowUp";
          break;
        case "ArrowDown":
          this.lastkey = "PRESS ArrowDown";
          break;
        default:
          break;
      }
    });
    window.addEventListener("keyup", (e) => {
      switch (e.key) {
        case "ArrowLeft":
          this.lastkey = "Release left";
          break;
        case "ArrowRight":
          this.lastkey = "Release ArrowRight";
          break;
        case "ArrowUp":
          this.lastkey = "Release ArrowUp";
          break;
        case "ArrowDown":
          this.lastkey = "Release ArrowDown";
          break;
        default:
          break;
      }
    });
  }
}
