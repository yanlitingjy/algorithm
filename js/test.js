// array.reduce(function(prev, current, currentIndex, arr), initialValue)
// prev：函数传进来的初始值或上一次回调的返回值
// current：数组中当前处理的元素值
// currentIndex：当前元素索引
// arr：当前元素所属的数组本身
// initialValue：传给函数的初始值

function transFromNumber(number){
    const  INDEX_MAP = ['零','一','二','三','四','五','六','七','八','九','十']
    if(!number) return
    if(number === 10) return INDEX_MAP[number]
    return [...number.toString()].reduce( (pre, cur) => pre  + INDEX_MAP[cur] , '' )
}

let number = transFromNumber(1034343435)
console.log(number)