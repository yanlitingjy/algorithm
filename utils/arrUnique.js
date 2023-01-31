/**
 * 数组对象根据字段去重
 * @param {*} arr 要去重的数组
 * @param {*} key 根据去重的字段名
 * @returns 新数组
 */
function uniqueArrayObject(arr,key){
    if(arr.length === 0) return;
    let list = []
    const map = {}
    arr.forEach(item=>{
        if(!map[item[key]]){
            map[item[key]] = item
        }
    })
    list = Object.values(map)
    return list
}
const responseList = [
    { id: 1, name: '树哥' },
    { id: 2, name: '黄老爷' },
    { id: 3, name: '张麻子' },
    { id: 1, name: '黄老爷' },
    { id: 2, name: '张麻子' },
    { id: 3, name: '树哥' },
    { id: 1, name: '树哥' },
    { id: 2, name: '黄老爷' },
    { id: 3, name: '张麻子' },
]

// let arr = uniqueArrayObject(responseList, 'id')
// console.log(arr)

let arr = [1,1,'true','true',true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,'NaN', 0, 0, 'a', 'a',{},{}];

//数组去重
function unique(arr) {
    let newArr = []
    arr.forEach(val=>{
        if(newArr.indexOf(val) === -1){
            newArr.push(val)
        }
    })
    return newArr;
}

//利用filter
function unique1(arr) {
    return arr.filter(function(item, index, arr) {
        //当前元素，在原始数组中的第一个索引==当前索引值，否则返回当前元素
        return arr.indexOf(item, 0) === index;
    });
}

console.log(unique1(arr))

//利用ES6 Set去重（ES6中最常用）
function unique2 (arr) {
  return Array.from(new Set(arr))
}
console.log(unique2(arr))
 //[1, "true", true, 15, false, undefined, null, NaN, "NaN", 0, "a", {}, {}]
