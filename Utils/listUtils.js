
const combine = function(num, subsets=[[]]){
  let newSubSets = subsets.map((element)=>{
    return element.concat([num]);
  });
  return subsets.concat(newSubSets);
};
  
const getSubSetsOf = function(list){
  return list.reduce((acc,element)=>{
    return combine(element, acc);
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

module.exports = {
  getSubSetsOf,
  combine,
  getUniqueOf
};
