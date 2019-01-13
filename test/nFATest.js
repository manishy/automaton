const {assert} = require('chai');
const nFA = require("../src/nFA.js");


let machine = {};
describe('#nFA', () => {
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

  it("should return true for those languages which includes alternate characters beginning and ending with same letter", ()=>{
    assert.isTrue(machine.doesAccept("0"));
    assert.isTrue(machine.doesAccept("010"));
    assert.isTrue(machine.doesAccept("01010"));
    assert.isTrue(machine.doesAccept("1"));
    assert.isTrue(machine.doesAccept("101"));
    assert.isTrue(machine.doesAccept("10101"));
  })
  it("should return false for those languages which includes alternate characters beginning and ending with same letter", ()=>{
    assert.isFalse(machine.doesAccept(""));
    assert.isFalse(machine.doesAccept("10"));
    assert.isFalse(machine.doesAccept("01"));
    assert.isFalse(machine.doesAccept("11"));
    assert.isFalse(machine.doesAccept("00"));
    assert.isFalse(machine.doesAccept("001"));
    assert.isFalse(machine.doesAccept("100"));
    assert.isFalse(machine.doesAccept("1100"));
    
  })
})  
