const {assert} = require('chai');
const nFA = require("../src/nFA");

let machine = {};
describe('#getActiveStates', () => {
    beforeEach(function() {
      const nfaTuple = {
        states: ['q1', 'q3', 'q7', 'q2', 'q5', 'q6', 'q4'],
        alphabets: ['1', '0'],
        delta: {
          q1: { e: ['q2', 'q5'] },
          q2: { '0': ['q3'] },
          q3: { '1': ['q4'] },
          q4: { '0': ['q3'] },
          q5: { '1': ['q6'] },
          q6: { '0': ['q7'] },
          q7: { '1': ['q6'] }
        },
        'start-state': 'q1',
        'final-states': ['q3', 'q6']
      };
      machine = new nFA(nfaTuple);
    });
  
    it("should return all active states for a given state which have one epsilon", ()=>{
        assert.deepEqual(machine.getActiveStates("q1",[]), ['q2', 'q5', 'q1']);
        assert.deepEqual(machine.getActiveStates("q2",[]), ['q2']);

    })

    it("should return all active states for a given state which have multiple epsilon ", ()=>{
        let nfaTuple = {
            "states": [ "q1", "q3", "q2", "q5", "q6", "q4"],
            "alphabets": [ "1", "0"],
            "delta": {"q1": {"0": ["q2","q4"],"1": ["q2","q4"]},
                 "q2": {"0": ["q2"],"e": ["q3"]},"q3": {"1": ["q3"],
                 "e": ["q6"]},"q4": {"1": ["q4"],"e": [ "q5" ] },
                 "q5": {"0": [ "q5" ], "e": [ "q6" ]
                }
              },
            "start-state": "q1",
            "final-states": [
              "q6"
            ]
        }
        machine = new nFA(nfaTuple);
        console.log(machine.getActiveStates('q2',[]));
        assert.deepEqual(machine.getActiveStates("q1",[]), ['q1']);
        // assert.deepEqual(machine.getActiveStates("q2",[]), ['q2','q3','q6']); // getting duplicate data need to fix it
    })

    describe('#getfinalStates',()=>{
        it('should give final states for one epsilon',()=>{
            assert.deepEqual(machine.getfinalStates(['q1'],'01'.split('')), ['q4']);
            assert.deepEqual(machine.getfinalStates(['q1'],'10'.split('')), ['q7']);
            assert.deepEqual(machine.getfinalStates(['q1'],'10111'.split('')), []);
            assert.deepEqual(machine.getfinalStates(['q1'],'01010101'.split('')), ['q4']);
        })

        it('should give final states for multiple epsilon',()=>{
            let nfaTuple = {
                "states": ["q1","q3","q2","q5","q6","q4"],
                "alphabets": [ "1", "0"],
                "delta": { "q1": {"0": ["q2","q4"],"1": ["q2","q4"]}, 
                 "q2": {"0": ["q2"],"e": ["q3"]},
                 "q3": {"1": ["q3"],"e": ["q6"]}, 
                 "q4": {"1": ["q4"],"e": [ "q5" ] }, 
                 "q5": {"0": [ "q5" ], "e": [ "q6" ]}
                  },
                "start-state": "q1",
                "final-states": [ "q6" ]
            }
            machine = new nFA(nfaTuple);
            // console.log(machine.getfinalStates('101'.split('')));
            assert.deepEqual(machine.getfinalStates(['q1'],'0'.split('')), [ 'q6', 'q3', 'q2', 'q5', 'q4' ]);
            assert.deepEqual(machine.getfinalStates(['q1'],'01'.split('')), [ 'q6', 'q3', 'q5', 'q4' ]);
            assert.deepEqual(machine.getfinalStates(['q1'],'101'.split('')), [ 'q6', 'q3' ]);
        })
    })
  })  
  
  