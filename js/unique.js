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