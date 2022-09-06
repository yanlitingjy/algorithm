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

let arr = uniqueArrayObject(responseList, 'id')
console.log(arr)