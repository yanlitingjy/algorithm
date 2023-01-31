/**
 * 判断对象是否为空
 * @param {*} obj 
 * @returns  BoolRen
 */
function isEmpty(obj){
    return Reflect.ownKeys(obj).length === 0 && obj.constructor === Object;
}

isEmpty({})// true
isEmpty({a:"not empty"}) //false