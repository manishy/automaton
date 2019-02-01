const testScenarios = require('../resources/testScenarios.json');
const {assert} = require('chai');
const nFAToDFA = require("../src/NFAToDFA.js");
const DFA = require("../src/DFA.js");


describe('Test scenarios from JSON for nFA', () => {
    const nfaTestCases = testScenarios.filter(testCase => testCase.type == "nfa-to-dfa");
    nfaTestCases.forEach(scenario=>{
        const machine = new nFAToDFA(scenario.tuple);
        let dfaTuple = machine.getDfaTuple();
        let dfaMachine = new DFA(dfaTuple);
        describe(`should give true when given input string contains ${scenario.name}` ,() => {
            scenario['pass-cases'].forEach((testCase,index) => {
                it(`Case ${index+1}`, () => {
                    assert.isTrue(dfaMachine.doesAccept(testCase));
                    // assert.isTrue(machine.doesAccept(testCase));
                });
            });
        });

        describe(`should give false when given input string contains ${scenario.name}` ,() => {
            scenario['fail-cases'].forEach((testCase,index) => {
                it(`Case ${index+1}`, () => {
                    assert.isFalse(dfaMachine.doesAccept(testCase));
                    // assert.isFalse(machine.doesAccept(testCase));
                });
            });
        });
    })
});

