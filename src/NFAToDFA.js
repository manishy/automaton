const NFA = require("./NFA.js");
const Utils = require("../Utils/listUtils.js");

class NFAToDFA extends NFA {
  constructor(tuple) {
    super(tuple);
    // this.allStateSubSets = Utils.getSubSetsOf(this.states);
  }


  getInitialStateForDFA() {
    let dfaInitialState = this.getActiveStates(this.initialState).sort();
    return Utils.getUniqueOf(dfaInitialState).join('');
  }

  getFinalStatesForDfa(){
    let NfaFinalStates = this.finalStates;
    let allStateSubSets = Utils.getSubSetsOf(this.states);
    let DfaFinalStatesSets = allStateSubSets.filter((subSet)=>{
      return subSet.some((element)=>{
        return NfaFinalStates.includes(element);
      });
    }).sort();

    return DfaFinalStatesSets.map((element)=>{
      return element.join('');
    });
  }

  getNextDfaStateOf(subSet, inputChar){
    let dfaStateSubset = subSet.reduce((acc, state)=>{
      let nextDfaState = this.getNextStates([state], inputChar).sort();
      acc.push(nextDfaState);
      return acc;
    }, []);
    return dfaStateSubset.reduce((acc, dfaSubSet)=>{
      return Utils.getUnionOf(acc, dfaSubSet);
    },[]).join('');
  }


  getDeltaOf(currentSubSet){
    return this.alphabets.reduce((acc, alphabet)=>{
      acc[alphabet] = this.getNextDfaStateOf(currentSubSet, alphabet);
      return acc;
    },{});
  }

  getDfaDelta(){
    let allStateSubSets = Utils.getSubSetsOf(this.states);
    return allStateSubSets.reduce((delta, subset)=>{
      let nextDfaStateDelta = this.getDeltaOf(subset);
      delta[subset.join('')] = nextDfaStateDelta;
      return delta;
    },{});
  }

  getDfaTuple(){
    let dfaTuple = {};
    let dfaDelta = this.getDfaDelta();
    dfaTuple['states'] = Object.keys(dfaDelta);
    dfaTuple['alphabets'] = this.alphabets;
    dfaTuple['delta'] = dfaDelta;
    dfaTuple['start-state'] = this.getInitialStateForDFA();
    dfaTuple['final-states'] = this.getFinalStatesForDfa();
    return dfaTuple;
  }
}


module.exports = NFAToDFA;

