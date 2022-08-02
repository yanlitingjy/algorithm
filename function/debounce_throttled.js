/**
 * 防抖: n 秒后在执行该事件，若在 n 秒内被重复触发，则重新计时
 */
function debounce(fn,delay) {
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
function debounce1(fn,delay,isImmediate) {
    let timer = null
    let isInvoke = false
    return function(...args) {
        if(timer) clearTimeout(timer)
        // 判断是否需要立即执行
        if(isImmediate && !isInvoke){
            fn.apply(this,args)
            isInvoke = true
        }else{ // 延迟执行
            timer = setTimeout(()=>{
                fn.apply(this,args)
                isInvoke = false
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
        if (!timer) {
            timer = setTimeout(() => {
                fn.apply(this, args)
                timer = null
            }, delay);
        }
    }
}

// 通过参数控制是否立即执行
const throttle2 = (fn, delay, isImmediate) => {
    let timer = null
    let isInvoke = false
    return function(...args) {
        if (timer) return;
        if (isImmediate && !isInvoke ) {
            fn.apply(this, args);
            timer = setTimeout(() => {
                isInvoke = false;
            }, delay);
        } else {
            timer = setTimeout(() => {
                fn.apply(this, args);
                isInvoke = false;
            }, delay);
        }
    }
}
