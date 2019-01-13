const Machine = require("./Machine.js");

class DFA extends Machine {
  constructor(tuple) {
    super(tuple);
  }

  getFinalState(languageAlphabets, delta, currentState) {
    let reducer = function(acc, element) {
      let nextPossibleStates = acc[currentState];
      let nextPos = nextPossibleStates[element];
      let nextState = {};
      nextState[nextPos] = delta[nextPossibleStates[element]];
      currentState = nextPos;
      return nextState;
    }
    let initialState = {};
    initialState[currentState] = delta[currentState];
    let finalState = languageAlphabets.reduce(reducer, initialState);
    return currentState;
  }

  doesAccept(language) {
    let delta = this.delta;
    let currentState = this.initialState;
    let languageAlphabets = language.split("");
    let finalState = this.getFinalState(languageAlphabets, delta, currentState);
    return this.isAcceptable(finalState);
  }
}

module.exports = DFA;
