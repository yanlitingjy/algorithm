/**
 * 函数柯里化是把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，
 * 并且返回接受余下的参数而且返回结果的新函数的技术。
 * @param {*} fn 输入参数，返回参数
 * 中间函数返回函数，最后函数返回结果
 * 核心思想是把多参数传入的函数拆成单参数（或部分）函数，内部再返回调用下一个单参数（或部分）函数，依次处理剩余的参数。
 */
function curry(fn,...args){
    const fnArgsLength = fn.length // 传入函数的参数长度
    let args = []
    function calc(...newArgs){
        args = [
            ...args,
            ...newArgs
        ]
        if(args.length < fnArgsLength){
            // 参数不够，返回函数
            return calc
        } else {
            // 参数够了，返回执行结果
            return fn.apply(this,args.slice(0,fnArgsLength))
        }
    }
    return calc
}

function add(a,b,c){
    return a + b + c
}

const  curryAdd = curry(add)
console.log(curryAdd(10)(20)(30))