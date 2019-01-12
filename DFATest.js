const {assert} = require('chai');
const DFA = require("./DFA.js");

let machine = {};
let tuple = {};

describe('#DFA', () => {
  beforeEach(function() {
    let tuple = {
      states: ['q1', 'q2'],
      alphabets: ['1', '0'],
      delta: { q1: { '0': 'q2', '1': 'q1' }, q2: { '0': 'q1', '1': 'q2' } },
      'start-state': 'q1',
      'final-states': ['q2']
    };
    machine = new DFA(tuple);
  });


  describe('#isAcceptable',()=>{
    it("should return true for acceptable state", ()=>{
      assert.isTrue(machine.isAcceptable('q2'));
    })

    it("should return false for rejectable state", ()=>{
      assert.isFalse(machine.isAcceptable('q1'));
    })
  })
})
