const testScenarios = require('../resources/testScenarios.json');
const {assert} = require('chai');
const nFA = require("../src/nFA.js");


describe('Test scenarios from JSON for nFA', () => {
    const nfaTestCases = testScenarios.filter(testCase => testCase.type == "nfa");
   
    nfaTestCases.forEach(scenario=>{
        const machine = new nFA(scenario.tuple);
        describe(`should give true when given input string contains ${scenario.name}` ,() => {
            scenario['pass-cases'].forEach((testCase,index) => {
                it(`Case ${index+1}`, () => {
                    assert.isTrue(machine.doesAccept(testCase));
                });
            });
        });

        describe(`should give false when given input string contains ${scenario.name}` ,() => {
            scenario['fail-cases'].forEach((testCase,index) => {
                it(`Case ${index+1}`, () => {
                    assert.isFalse(machine.doesAccept(testCase));
                });
            });
        });
    })
});

