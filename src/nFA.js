const Machine = require("./Machine.js");

class nFA extends Machine {
    constructor(tuple) {
        super(tuple);
    }

    getFinalState(languageAlphabets, delta, currentState) {
        let reducer = function (acc, element) {
            let epsilon = 'e';
            let nextPosibleStates = Object.values(acc);
            let nextStates = {};
            for (let i = 0; i < nextPosibleStates.length; i++) {
                let instruction = nextPosibleStates[i];
                if (instruction[epsilon]) {
                    let epsilonStates = {};
                    for (let j = 0; j < instruction[epsilon].length; j++) {
                        let state = instruction[epsilon][j];
                        epsilonStates[state] = delta[state];
                    }
                    nextPosibleStates = nextPosibleStates.concat(Object.values(epsilonStates));
                }
                if (instruction[element]) {
                    for (let k = 0; k < instruction[element].length; k++) {
                        let state = instruction[element][k];
                        nextStates[state] = delta[state];
                    }
                }
            }
            currentState = Object.keys(nextStates);
            return nextStates;
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
        let finalStates = this.getFinalState(languageAlphabets, delta, currentState);
        let isAcceptable = Object.keys(finalStates).some((element) => this.isAcceptable(element));
        // console.log(finalStates);
        return isAcceptable;
    }
}


module.exports = nFA;