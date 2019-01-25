const {assert} = require('chai');
const Utils = require("../Utils/listUtils")

describe('#',()=>{
    it('should give subsets of a given list',()=>{
        let states = ['q0', 'q1', 'q2'];
        let expected = [ [],[ 'q0' ], [ 'q1' ], [ 'q0', 'q1' ], [ 'q2' ], [ 'q0', 'q2' ], [ 'q1', 'q2' ], [ 'q0', 'q1', 'q2' ] ];
        assert.deepEqual(Utils.getSubSetsOf(states),expected)
    })

    it('should give subsets as an empty array for empty list',()=>{
        let states = [];
        // console.log(Utils.getSubSetsOf(states));
        let expected = [ [] ]
        assert.deepEqual(Utils.getSubSetsOf(states),expected)
    })

    it('should give subsets for only one state',()=>{
        let states = ['q1'];
        // console.log(Utils.getSubSetsOf(states));
        let expected = [ [], ['q1'] ]
        assert.deepEqual(Utils.getSubSetsOf(states),expected)
    })
})