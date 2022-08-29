
function isEmpty(obj){
    return Reflect.ownKeys(obj).length === 0 && obj.constructor === Object;
}

isEmpty({})// true
isEmpty({a:"not empty"}) //false