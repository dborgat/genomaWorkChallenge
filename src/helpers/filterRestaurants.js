export const filterArray = (array, filterString) => {
    let arrayToReturn = [];
    let objResto = { text: "", value: "" };
    let arrayOfFilterString = []
    for (let i = 0; i < array.length; i++) {
      arrayOfFilterString.push(array[i][filterString])
    }
    let result = arrayOfFilterString.filter((item,index)=>{
        return arrayOfFilterString.indexOf(item) === index;
      })
     for (let i = 0; i < result.length; i++) {objResto = { text: result[i].toString(), value: result[i].toString() };
      arrayToReturn.push(objResto)}
    return arrayToReturn
  };
  
