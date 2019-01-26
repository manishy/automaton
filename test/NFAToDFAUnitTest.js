const {assert} = require('chai');
const nFAToDFA = require("../src/nFAToDFA");

describe('#NfaToDfa', ()=>{
    const nfaTuple = {
        states: ['q0', 'q1', 'q2'],
        alphabets: ['a', 'b'],
        delta: {
          q0: {e: ['q2'], 'b': ['q1']},
          q2: {'a': ['q0']},
          q1: {'a': ['q1', 'q2'], 'b': ['q2']},
        },
        'start-state': 'q0',
        'final-states': ['q0']
      };
      let Machine = new nFAToDFA(nfaTuple);
      describe('#getInitialStateForDFA',()=>{
        it('should return initial state for DFA according to nFA tuple', ()=>{
            assert.deepEqual(Machine.getInitialStateForDFA(), 'q0q2');
        })
      })

      describe('#getFinalStatesForDfa', ()=>{
          it('should give final states for Dfa according to Nfa tuple',()=>{
            //   console.log(Machine.getFinalStatesForDfa());
              assert.deepEqual(Machine.getFinalStatesForDfa(),  [ 'q0', 'q0q1', 'q0q1q2', 'q0q2' ]);
          })
      })
  
})