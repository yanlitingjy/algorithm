// 数组扁平化，可使用arr.flat()方法实现

/**
 * 实现数组扁平化，值减少一层嵌套
 * @param {*} arr 通过push 实现
 * @returns 
 */
/**
 * 实现思路
 * 定义空数组，遍历当前数组
 * 如果item非数组，累加到arr
 * 如果item是数组，则遍历之后累加到arr
 */
function flatten1(arr){
    const res = []
    arr.foEach(item=>{
        if(Array.isArray(item)) {
            item.forEach(n=>res.push(n))
        }else {
            res.push(item)
        }
    })
    return res;
}
/**
 * 实现数组扁平化，值减少一层嵌套
 * @param {*} arr 使用concat
 * @returns 
 */
function flatten2(arr){
    const res = []
    arr.foEach(item=>{
        res = res.concat(item)
    })
    return res;
}
// 实现数组深度扁平化
/**
 * 实现思路
 * 先实现一级扁平化，然后递归调用，实现扁平化
 */
/**
 * 
 * @param {*} arr 使用push
 * @returns 
 */
 function flattenDeep(arr){
    const res = []
    arr.foEach(item=>{
        if(Array.isArray(item)) {
            const flatItem = flatten3(item)
            flatItem.forEach((n=>res.push(n)))
        }else {
            res.push(item)
        }
    })
    return res;
}
/**
 * 实现数组扁平化，值减少一层嵌套
 * @param {*} arr 使用concat
 * @returns 
 */
 function flattenDeep2(arr){
    let res = []
    arr.foEach(item=>{
        if(Array.isArray(item)) {
            const flatItem = flattenDeep2(item)
            res = res.concat(flatItem)
        }else {
            res = res.concat(item)
        }
    })
    return res;
}