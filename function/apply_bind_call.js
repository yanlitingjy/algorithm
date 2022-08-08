// 区别
// 1、三者都可以改变函数的this对象指向
// 2、三者第一个参数都是this要指向的对象，如果没有这个参数或参数为undefined或null，则默认指向全局window
// 3、三者都可以传参，但是apply是数组，而call是参数列表，且apply和call是一次性传入参数，而bind可以分为多次传入
// 4、bind是返回绑定this之后的函数，apply、call 则是立即执行

/**
 * 改变this指向
 * @param {*} context this 指向
 * @param {*} args 参数，数组
 * @returns 无
 */
function myApply(context,args){
    let context = context || window
    context.fn = this
    let result = eval(context.fn(...args))
    delete context.fn
    return result
}

/**
 * 改变this指向
 * @param {*} context this 指向
 * @param {*} args 参数，列表
 * @returns 无
 */
function myCall(context, ...args){
    let context = context || window; 
    context.fn = this;  //this是当前函数
    var result = eval(context.fn(...args)); //执行完函数，并将结果返回
    delete context.fn  //清理掉fn，防止污染
    return result;
}
/**
 * 改变this指向
 * @param {*} context this 指向
 * @param {*} args 参数，列表
 * @returns 函数
 */
function myBind(context,...bindArgs){
    // this为调用myBind的函数。将this赋值给变量_this
    let _this = this; //当前的函数本身
    // 返回函数fn
    return function fn(...args){
    	//拼接参数
    	const newArgs = bindArgs.concat(args)
        // 通过apply方法调用函数并返回结果。
        return _this.apply(context,newArgs);
    }
}
