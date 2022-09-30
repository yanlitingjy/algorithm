// compose 组合函数
// 后一个函数作为前一个函数的参数
// 最后一个函数可以接受多个参数，前面的函数只能接受单个参数；后一个的返回值传给前一个

// 题目描述:实现一个 compose 函数
// 用法如下:
function fn1(x) {
    return x + 1;
}

function fn2(x) {
    return x + 2;
}

function fn3(x) {
    return x + 3;
}

function fn4(x) {
    return x + 4;
}
const a = compose(fn1, fn2, fn3, fn4);
console.log(a(1)); // 1+4+3+2+1=11

function compose(...fn){
    if(fn.length==0) {
        return (v)=>v
    }
    if(fn.length==1){
        return fn[0]
    }
    return fn.reduce(
        (pre,cur)=>
        (...args)=>
        pre(cur(...args))
    )
}
