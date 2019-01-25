const Machine = require("./Machine.js");

class DFA extends Machine {
  constructor(tuple) {
    super(tuple);
  }

  getFinalState(languageAlphabets) {
    let getNextState = (initialState, alphabet)=>{
      return this.delta[initialState][alphabet];
    };
    let finalState = languageAlphabets.reduce(getNextState, this.initialState);
    return finalState;
  }

  doesAccept(language) {
    let finalState = this.getFinalState(language.split(""));
    return this.isAcceptable(finalState);
  }
}

module.exports = DFA;