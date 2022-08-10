/**
 * 防抖: n 秒后在执行该事件，若在 n 秒内被重复触发，则重新计时
 */
function debounce(fn,delay=500) {
    // 定义一个定时器,保存上一次的定时器
    let timer = null
    return function(...args) {
        // 取消上一次的定时器
        if(timer) clearTimeout(timer)
        // 延迟执行
        timer = setTimeout(()=>{
            fn.apply(this,args)
        },delay)
    }
}
// 如果需要立即执行的话
function debounce1(fn,delay=500,isImmediate=false) {
    let timer = null
    return function(...args) {
        let context = this
        if(timer) clearTimeout(timer)
        // 判断是否需要立即执行
        if(isImmediate){
            fn.apply(context,args)
        }else{ // 延迟执行
            timer = setTimeout(()=>{
                fn.apply(context,args)
            },delay)
        }
    }
}
/**
 * 节流 n 秒内只运行一次，若在 n 秒内重复触发，只有一次生效
 */
function throttled(fn, delay = 500) {
    let timer = null
    return function (...args) {
        let context = this
        if (timer) return;
        timer = setTimeout(() => {
            fn.apply(context, args)
            timer = null
        }, delay);
    }
}

// 通过参数控制是否立即执行
const throttle2 = (fn, delay=500, isImmediate=false) => {
    let flag = true
    return function(...args) {
        let context = this
        if(flag){
            flag = false
            isImmediate && fn.apply(context,args)
            setTimeout(() => {
                !isImmediate && fn.apply(context,args)
                flag = true
            },delay)
        }
    }
}
