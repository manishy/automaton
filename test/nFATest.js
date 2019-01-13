const {assert} = require('chai');
const nFA = require("../src/nFA.js");


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
      machine = new nFA(tuple);
    });

    
})  
