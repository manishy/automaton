const Machine = require("./Machine.js");

class nFA extends Machine {
    constructor(tuple) {
        super(tuple);
    }

    getCurrentStates(state, allStates){
        let delta = this.delta;
        const epsilon ='e';
        let epsilonState = (delta[state]&&delta[state][epsilon]) || []; // have to handle for final state
        let uniqueEpsilonStates = epsilonState.filter((state)=>{
            return (!allStates.includes(state));
        });
        allStates = uniqueEpsilonStates.concat(allStates);
        let containsEpsilon = uniqueEpsilonStates.some((state)=>{
            return delta[state] && delta[state][epsilon];
        });
        if(containsEpsilon){
            return uniqueEpsilonStates.flatMap((state)=>this.getCurrentStates(state, allStates)).concat(state);
        }
        return allStates.concat(state);
    }

    doesAccept(language){
        let self = this;
        let delta = self.delta;
        let langAlphabets = language.split("");
        let initialStates = this.getCurrentStates(this.initialState,[]);
        let getNextStates = function(currentStates, alphabet){
            let nextPossibleStates = currentStates.flatMap((state) => (delta[state] && delta[state][alphabet]) || []);
            return nextPossibleStates.flatMap((state)=>self.getCurrentStates(state,[]));
        }
        let finalStates = langAlphabets.reduce(getNextStates, initialStates)
        // console.log(finalStates);
        return finalStates.some((state)=>this.isAcceptable(state));
      
    }
}

module.exports = nFA;