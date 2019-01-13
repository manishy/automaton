class Machine {
  constructor(tuple) {
    this.tuple = tuple;
    this.delta = tuple.delta;
    this.states = tuple.states;
    this.alphabets = tuple.alphabets;
    this.initialState = tuple["start-state"];
    this.finalStates = tuple["final-states"];
  }

  isAcceptable(state) {
    let acceptableStates = this.finalStates;
    return acceptableStates.includes(state);
  }

  doesAccept(language){
    return null;
  }
}

module.exports = Machine;
