const Machine = require("./Machine.js");

class DFA extends Machine {
  constructor(tuple) {
    super(tuple);
  }

  getFinalState(languageAlphabets) {
    let currentState = this.initialState;
    let delta = this.delta;
    let getNextState = function(initialState, alphabet){
      return delta[initialState][alphabet];
    }
    let finalState = languageAlphabets.reduce(getNextState, currentState);
    return finalState;
  }

  doesAccept(language) {
    let finalState = this.getFinalState(language.split(""));
    return this.isAcceptable(finalState);
  }
}

module.exports = DFA;