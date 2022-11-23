// 实现数组push方法
Array.prototype.push = function() {
    for( let i = 0 ; i < arguments.length ; i++){
        this[this.length] = arguments[i] ;
    }
    return this.length;
}


// 返回一个由回调函数组成的新数组
function myMap(arr,fn){
    let res = []
    for(let i=0;i<arr.length;i++){
        res.push(fn(arr[i],i))
    }
    return res;
}

let arr = [40,87,53,12,36,19]
let result = myMap(arr,(value)=>{
    return value + 5
})
console.log(result) // [ 45, 92, 58, 17, 41, 24 ]

// 过滤函数中返回true的数组元素放在心的数组中返回
function myFilter(arr,fn){
    let res = [];
    for(let i=0;i<arr.length;i++){
        let value = fn(arr[i],i)
        if(value){
            res.push(arr[i])
        }
    }
    return res;
}

let result1 = myFilter(arr,(value)=>{
    return value > 40
})
console.log(result1)  // [87,53]

// 回调函数中所有的返回结果都为true时，返回true，否则返回false
function myEvery(arr,fn){
    let result = false
    for(let i=0;i<arr.length;i++){
        result = fn(arr[i])
        if(!result){
            break;
        }
    }
    return result;
}
let result2 = myEvery(arr,(value)=>{
    return value < 30
})
console.log(result2)  // false

// 回调函数中只要有一个返回结果为true，就返回true，否则返回false
function mySome(arr,fn){
    let result = false
    for(let i=0;i<arr.length;i++){
        result = fn(arr[i])
        if(result){
            break;
        }
    }
    return result;
}
let result3 = mySome(arr,(value)=>{
    return value > 60
})
console.log(result3)  // true

function myFind(arr,fn){
    let result;
    for(let i=0;i<arr.length;i++){
        result = fn(arr[i])
        if(result){
            return arr[i]
        }
    }
}

// 找到回调函数条件一样的值，找到的话，返回该值，没有找到，就返回undefined
let result4 = myFind(arr,(value)=>{
    return value == 12
})
console.log(result4)  // 12

// reduce 从左到右为每个数组元素执行一次回调函数，并把上次回调函数的返回值放在一个暂存器中，传给下次回调函数，并返回最后一次回调函数的返回值
function myReduce(arr,fn,initValue){
    let res = initValue
    for(let i=0;i<arr.length;i++){
        res = fn(res,arr[i])
    }
    return res
}
let arr1 = [1,2,3,4,5]
let result5 = myReduce(arr1,(res,value)=>{
    return res + value
},10)
console.log(result5)