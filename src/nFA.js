const Machine = require("./Machine");
const Utils = require("../Utils/listUtils");

class NFA extends Machine {
  constructor(tuple) {
    super(tuple);
  }

  getActiveStates(state, allStates=[]){ // gives some duplicate data, have to fix it
    const epsilon ='e';
    let epsilonState = (this.delta[state]&&this.delta[state][epsilon]) || [];
    let uniqueEpsilonStates = epsilonState.filter((state)=>{
      return (!allStates.includes(state));
    });
    allStates = uniqueEpsilonStates.concat(allStates);
    let containsEpsilon = uniqueEpsilonStates.some((state)=>{
      return this.delta[state] && this.delta[state][epsilon];
    });
    if(containsEpsilon){
      return uniqueEpsilonStates.flatMap((state)=>this.getActiveStates(state, allStates)).concat(state);
    }
    return allStates.concat(state);
  }

  getNextStates(currentStates, alphabet){
    let nextPossibleStates = currentStates.flatMap((state) => (this.delta[state] && this.delta[state][alphabet]) || []);
    return nextPossibleStates.flatMap((state)=>this.getActiveStates(state));
  }

  getfinalStates(currentStates, languageAlphabets){
    let initialStates = this.getActiveStates(currentStates);
    let finalStates = Utils.getUniqueOf(languageAlphabets.reduce(this.getNextStates.bind(this), initialStates));
    return finalStates;
  }

  doesAccept(language){
    let langAlphabets = language.split("");
    let finalStates = this.getfinalStates(this.initialState, langAlphabets);
    return finalStates.some((state)=>this.isAcceptable(state));
  }
}

module.exports = NFA;