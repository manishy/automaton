const Machine = require("./Machine.js")

class DFA extends Machine {
  constructor(tuple) {
    super(tuple);
  }

  isAcceptable(state){
    let acceptableState = this.finalStates;
    return acceptableState.includes(state);
  }

}

module.exports = DFA;
