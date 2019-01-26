const NFA = require("./NFA");
const Utils = require("../Utils/listUtils");

class NFAToDFA extends NFA {
  constructor(tuple) {
    super(tuple);
  }


  getInitialStateForDFA() {
    let dfaInitialState = this.getActiveStates(this.initialState).sort();
    return dfaInitialState.join('');
  }

  getFinalStatesForDfa(){
    let allDfaStates = Utils.getSubSetsOf(this.states);
    let NfaFinalStates = this.finalStates;
    let DfaFinalStatesSets = allDfaStates.filter((subSet)=>{
      return subSet.some((element)=>{
        return NfaFinalStates.includes(element);
      });
    }).sort();

    return DfaFinalStatesSets.map((element)=>{
      return element.join('');
    });
  }

}


module.exports = NFAToDFA;

