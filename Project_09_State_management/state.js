export const states = {
  STANDING_LEFT: 0,
  STANDING_RIGHT: 1,
};

class State {
  constructor(state) {
    this.state = state;
  }
}

class StandingLeft extends State {
  constructor(player) {
    super("STANDING LEFT");
  }
}
