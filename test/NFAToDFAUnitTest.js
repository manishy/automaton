const {assert} = require('chai');
const nFAToDFA = require("../src/nFAToDFA");

describe('#NfaToDfa', ()=>{
    let nfaTuple = {
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
        it('should return initial state for DFA according to nFA tuple in case of duplicate ', ()=>{
            let nfaTuple = {
                states: [ "q1", "q3", "q9", "q7", "q2", "q8", "q5", "q6", "q4"],
                alphabets: [ "1", "0"],
                delta: {
                  "q1": {
                    "e": [  "q2",  "q4"]
                  },
                  "q3": {
                    "0": [ "q3" ]
                  },
                  "q9": {
                    "e": [ "q7"]
                  },
                  "q7": {
                    "1": [ "q8"],
                    "e": [ "q9" ]
                  },
                  "q2": {
                    "0": ["q3"]
                  },
                  "q8": {
                    "0": [ "q9"]
                  },
                  "q5": {
                    "1": ["q6"]
                  },
                  "q6": {
                    "e": [  "q7",  "q4"]
                  },
                  "q4": {
                    "0": [ "q5"],
                    "e": [ "q6"]
                  }
                },
                "start-state": "q1",
                "final-states": [ "q3", "q9", "q6"]
              }
            let nfaToDfaMachine = new nFAToDFA(nfaTuple);
            // console.log(nfaToDfaMachine.getInitialStateForDFA());
            assert.equal(nfaToDfaMachine.getInitialStateForDFA() ,'q1q2q4q6q7q9')
        })
      })

      describe('#getFinalStatesForDfa', ()=>{
          it('should give final states for Dfa according to Nfa tuple',()=>{
              assert.deepEqual(Machine.getFinalStatesForDfa(),  [ 'q0', 'q0q1', 'q0q1q2', 'q0q2' ]);
          })
      })

      describe('#getNextStatesForDfa', ()=>{
          it('should give next states for dfa', ()=>{
            assert.equal(Machine.getNextDfaStateOf(['q0'], 'b'), 'q1')
            assert.equal(Machine.getNextDfaStateOf(['q1'], 'a'), 'q1q2')
            assert.equal(Machine.getNextDfaStateOf(['q1'], 'b'), 'q2')
            assert.equal(Machine.getNextDfaStateOf(['q2'], 'a'), 'q0q2')
            assert.equal(Machine.getNextDfaStateOf(['q2', 'q1'], 'a'), 'q0q1q2')
            assert.equal(Machine.getNextDfaStateOf(['q2', 'q1', 'q0'], 'a'), 'q0q1q2')
            assert.equal(Machine.getNextDfaStateOf(['q2', 'q1', 'q0'], 'b'), 'q1q2')
          })

          it('should return nextDfaState as \'\' for Dead state', ()=>{
            assert.equal(Machine.getNextDfaStateOf(['q0'], 'a'), '')
            assert.equal(Machine.getNextDfaStateOf(['q2'], 'b'), '')
          })
      })

      describe('#getDeltaOf', ()=>{
          it('should return delta for current state',()=>{
              assert.deepEqual(Machine.getDeltaOf(['q1']), { a: 'q1q2', b: 'q2' })
              assert.deepEqual(Machine.getDeltaOf(['q0']), { a: '', b: 'q1' })
              assert.deepEqual(Machine.getDeltaOf(['q2']), { a: 'q0q2', b: '' })
              assert.deepEqual(Machine.getDeltaOf(['q0','q2']), { a: 'q0q2', b: 'q1' })
              assert.deepEqual(Machine.getDeltaOf(['q0', 'q1', 'q2']), { a: 'q0q1q2', b: 'q1q2' })
          })
      })

      describe('#getDfaDelta', ()=>{
        it('should return delta for dfa according nfaDelta',()=>{
            let expectedDelta = {
                'D' :     {'a': 'D',       'b': 'D'},
                'q0':     {'a': 'D',       'b': 'q1'},
                'q1':     {'a': 'q1q2',    'b': 'q2'},
                'q2':     {'a': 'q0q2',    'b': 'D'},
                'q0q1':   {'a': 'q1q2',    'b': 'q1q2'},
                'q0q2':   {'a': 'q0q2',    'b': 'q1'},
                'q1q2':   {'a': 'q0q1q2',  'b': 'q2'},
                'q0q1q2': {'a': 'q0q1q2',  'b': 'q1q2'}
              }
            //   console.log(Machine.getDfaDelta());
            //   console.log(Machine.getDfaTuple());
              assert.deepEqual(Machine.getDfaDelta()['q0'], {'a': '', 'b': 'q1'});
        })
    })
  
})

