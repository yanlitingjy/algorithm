/**
 * 
 * @param {*} x 任意类型的值
 * @returns 数据类型
 */
function getType(x){
    const originType = Object.prototype.toString.call(x)
    const spaceIndex = originType.indexOf(' ')
    const type = originType.slice(spaceIndex+1,-1)
    return type.toLowerCase()
}

let obj = {
    a:'1',
    b:'2'
}
console.log(getType(obj))