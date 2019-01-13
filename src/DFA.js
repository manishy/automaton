const Machine = require("./Machine.js");

class DFA extends Machine {
  constructor(tuple) {
    super(tuple);
  }

  getFinalState(languageAlphabets, delta, currentState) {
    let reducer = function (acc, alphabet) {
      let nextStateDelta = {};
      let nextPossibleStates = acc[currentState];
      // console.log(nextPossibleStates, Object.values(acc));
      // let nextPossibleStates = Object.values(acc)[0];
      let nextState = nextPossibleStates[alphabet];
      nextStateDelta[nextState] = delta[nextPossibleStates[alphabet]];
      currentState = nextState;
      return nextStateDelta;
    }
    let initialState = {};
    initialState[currentState] = delta[currentState];
    let finalState = languageAlphabets.reduce(reducer, initialState);
    return finalState;
  }

  doesAccept(language) {
    let delta = this.delta;
    let currentState = this.initialState;
    let languageAlphabets = language.split("");
    let finalState = this.getFinalState(languageAlphabets, delta, currentState);
    // return this.isAcceptable(finalState);
    return Object.keys(finalState).some((element)=>this.isAcceptable(element));
    
  }
}

module.exports = DFA;