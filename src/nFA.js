const Machine = require("./Machine.js");

class nFA extends Machine {
    constructor(tuple) {
      super(tuple);
    }

    getFinalState(languageAlphabets, delta, currentState){
        return '';
    }

    doesAccept(language){
        let delta = this.delta;
        let currentState = this.initialState;
        let languageAlphabets = language.split("");
        let finalState = this.getFinalState(languageAlphabets, delta, currentState);
        return this.isAcceptable(finalState);
    }
}


module.exports = nFA;