const {assert} = require('chai');
const DFA = require("./DFA.js");

let machine = {};
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

  describe('#doesAccept', ()=>{
    it("should return true for those languages which includes odd number of zeros", () => {
      assert.isTrue(machine.doesAccept('0'));
      assert.isTrue(machine.doesAccept('000'));
      assert.isTrue(machine.doesAccept('0000000'));
      assert.isTrue(machine.doesAccept('1010101010'));
      assert.isTrue(machine.doesAccept('010101010'));
      assert.isTrue(machine.doesAccept('10'));
    });

    it("should return false for those languages which does not include odd number of zeros", () => {
      assert.isFalse(machine.doesAccept('00'));
      assert.isFalse(machine.doesAccept('0000'));
      assert.isFalse(machine.doesAccept('1001'));
      assert.isFalse(machine.doesAccept('1010'));
      assert.isFalse(machine.doesAccept('001100'));
    });

    it("should return true for those languages which includes even number of zeros", () => {
      let tuple = {
      "states":["q1", "q2"],
      "alphabets":["1", "0"],
      "delta":{ "q1":{"0":"q2","1":"q1"}, "q2":{"0":"q1","1":"q2"}},
      "start-state":"q1",
      "final-states":["q1"]
    }
      machine =  new DFA(tuple);
      assert.isTrue(machine.doesAccept('00'));
      assert.isTrue(machine.doesAccept('0000'));
      assert.isTrue(machine.doesAccept('1001'));
      assert.isTrue(machine.doesAccept('1010'));
      assert.isTrue(machine.doesAccept('001100'));
    });

    it("should return false for those languages which does not include even number of zeros", () => {
      let tuple = {
      "states":["q1", "q2"],
      "alphabets":["1", "0"],
      "delta":{ "q1":{"0":"q2","1":"q1"}, "q2":{"0":"q1","1":"q2"}},
      "start-state":"q1",
      "final-states":["q1"]
    }
      machine =  new DFA(tuple);
      assert.isFalse(machine.doesAccept('0'));
      assert.isFalse(machine.doesAccept('000'));
      assert.isFalse(machine.doesAccept('00000'));
      assert.isFalse(machine.doesAccept('10'));
      assert.isFalse(machine.doesAccept('101010'));
      assert.isFalse(machine.doesAccept('010101'));
    });

    it("should return true for those languages which includes alternate ones and zeroes beginning with zero", ()=>{
      let tuple = {
      "states":["q1","q3","q2","q4"],
      "alphabets":["1","0"],
      "delta":{"q1":{"0":"q2","1":"q4"},
        "q2":{"0":"q4","1":"q3"},
        "q3":{"0":"q2","1":"q4"},
        "q4":{"0":"q4","1":"q4"}
      },
      "start-state":"q1",
      "final-states":["q3","q2"]
    }
    machine =  new DFA(tuple);
    assert.isTrue(machine.doesAccept('0'));
    assert.isTrue(machine.doesAccept('01'));
    assert.isTrue(machine.doesAccept('010'));
    assert.isTrue(machine.doesAccept('0101'));
    assert.isTrue(machine.doesAccept('01010'));
    assert.isTrue(machine.doesAccept('010101'));
    })


    it("should return false for those languages which does not include alternate ones and zeroes beginning with zero", ()=>{
      let tuple = {
      "states":["q1","q3","q2","q4"],
      "alphabets":["1","0"],
      "delta":{"q1":{"0":"q2","1":"q4"},
        "q2":{"0":"q4","1":"q3"},
        "q3":{"0":"q2","1":"q4"},
        "q4":{"0":"q4","1":"q4"}
      },
      "start-state":"q1",
      "final-states":["q3","q2"]
    }
    machine =  new DFA(tuple);
    assert.isFalse(machine.doesAccept(''));
    assert.isFalse(machine.doesAccept('1'));
    assert.isFalse(machine.doesAccept('10'));
    assert.isFalse(machine.doesAccept('101'));
    assert.isFalse(machine.doesAccept('11'));
    assert.isFalse(machine.doesAccept('0100'));
    assert.isFalse(machine.doesAccept('011'));
    })
  })

})
