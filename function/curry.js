/**
 * 实现函数柯里话
 * @param {*} fn 输入参数，返回参数
 * 中间函数返回函数，最后函数返回结果
 */
function curry(fn){
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