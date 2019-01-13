const Machine = require("./Machine.js");

class DFA extends Machine {
  constructor(tuple) {
    super(tuple);
  }

  getFinalState(languageAlphabets, delta, currentState) {
    let reducer = function(acc, element) {
      let nextStateDelta = {};
      let nextPossibleStates = acc[currentState];
      let nextState = nextPossibleStates[element];
      nextStateDelta[nextState] = delta[nextPossibleStates[element]];
      currentState = nextState;
      return nextStateDelta;
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
