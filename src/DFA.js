const Machine = require("./Machine.js");

class DFA extends Machine {
  constructor(tuple) {
    super(tuple);
  }

  getFinalState(languageAlphabets, delta, currentState) {
    let getNextState = function(initialState, alphabet){
      return delta[initialState][alphabet];
    }
    let finalState = languageAlphabets.reduce(getNextState, currentState);
    return finalState;
  }

  doesAccept(language) {
    let finalState = this.getFinalState(language.split(""), this.delta, this.initialState);
    return this.isAcceptable(finalState);
  }
}

module.exports = DFA;