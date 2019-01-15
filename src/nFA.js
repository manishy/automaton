const Machine = require("./Machine.js");

class nFA extends Machine {
    constructor(tuple) {
        super(tuple);
    }

    getActiveStates(state, allStates){
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
            return uniqueEpsilonStates.flatMap((state)=>this.getActiveStates(state, allStates)).concat(state);
        }
        return allStates.concat(state);
    }

    getfinalStates(languageAlphabets){
        let self = this;
        let delta = self.delta;
        let initialStates = this.getActiveStates(this.initialState,[]);
        let getNextStates = function(currentStates, alphabet){
            let nextPossibleStates = currentStates.flatMap((state) => (delta[state] && delta[state][alphabet]) || []);
            return nextPossibleStates.flatMap((state)=>self.getActiveStates(state,[]));
        }
        let finalStates = languageAlphabets.reduce(getNextStates, initialStates);
        return finalStates;
    }

    doesAccept(language){
        let langAlphabets = language.split("");
        let finalStates = this.getfinalStates(langAlphabets);
        return finalStates.some((state)=>this.isAcceptable(state));
      
    }
}

module.exports = nFA;