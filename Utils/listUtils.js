
const combine = function(num, subsets=[[]]){
  let newSubSets = subsets.map((element)=>{
    return element.concat([num]).sort();
  });
  return subsets.concat(newSubSets);
};
  
const getSubSetsOf = function(list){
  return list.reduce((acc,element)=>{
    return combine(element, acc).sort();
  },[[]]);
};


const getUniqueOf = function(arr){
  return arr.reduce((acc, element)=>{
    if(!acc.includes(element)){
      acc.push(element);
    }
    return acc;
  },[]);
};

const getUnionOf = function(list1, list2){
  let combined = list1.concat(list2);
  return getUniqueOf(combined);
};

module.exports = {
  getSubSetsOf,
  combine,
  getUniqueOf,
  getUnionOf
};
