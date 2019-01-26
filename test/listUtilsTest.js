const {assert} = require('chai');
const Utils = require("../Utils/listUtils")

describe('#listUtils',()=>{
    describe('#getSubSetsOf', ()=>{
        it('should give subsets of a given list',()=>{
            let states = ['q0', 'q1', 'q2'];
            let expected = [ [],[ 'q0' ], [ 'q0', 'q1' ], [ 'q0', 'q1', 'q2' ], [ 'q0', 'q2' ], [ 'q1' ], [ 'q1', 'q2' ], [ 'q2' ] ];
            assert.deepEqual(Utils.getSubSetsOf(states),expected)
        })

        it('should give subsets as an empty array for empty list',()=>{
            let states = [];
            let expected = [ [] ]
            assert.deepEqual(Utils.getSubSetsOf(states),expected)
        })
        it('should give subsets for only one state',()=>{
            let states = ['q1'];
            let expected = [ [], ['q1'] ]
            assert.deepEqual(Utils.getSubSetsOf(states),expected)
        })
    })

describe('#getUnionOf', ()=>{
    it('should give union of two lists', ()=>{
      let firstList = [1,2,3,4];
      let secondList = [3,4,5]; 
      let expected = [1,2,3,4,5];
    //   console.log(Utils.getUnionOf(firstList, secondList));
      assert.deepEqual(Utils.getUnionOf(firstList, secondList), expected); 
    })
})
})