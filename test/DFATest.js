const testScenarios = require('../resources/testScenarios.json');
const {assert} = require('chai');
const DFA = require("../src/DFA");

describe('Test scenarios from JSON for DFA', () => {
    const dfaTestCases = testScenarios.filter(testCase => testCase.type == "dfa");
    dfaTestCases.forEach(scenario=>{
        describe(`should give true when given input string contains ${scenario.name}` ,() => {
            scenario['pass-cases'].forEach((testCase,index) => {
                it(`Case ${index+1}`, () => {
                    const machine = new DFA(scenario.tuple);
                    assert.isTrue(machine.doesAccept(testCase));
                });
            });
        });

        describe(`should give false when given input string contains ${scenario.name}` ,() => {
            scenario['fail-cases'].forEach((testCase,index) => {
                it(`Case ${index+1}`, () => {
                    const machine = new DFA(scenario.tuple);
                    assert.isFalse(machine.doesAccept(testCase));
                });
            });
        });
    })
});
