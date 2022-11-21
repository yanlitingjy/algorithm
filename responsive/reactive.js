
/** 判断是否是对象*/
function isObject(val){
    return val !== null && typeof val === 'object'
}

function covert(target){
    return isObject(target)?reactive(target):target
}

const hasOwnProperty = Object.defineProperty.hasOwnProperty

function hasOwn(target, key){
    return hasOwnProperty.call(target,key)
}

/**
 * reactive 实现原理
 * 1、接收一个参数，判断这个参数是否是对象
 * 2、创建拦截器对象handle，设置get/set/deleteProperty
 * 3、返回proxy对象
 */
export function reactive(target) {
    if(!isObject(target)) return target;
    const handle = {
        // 收集依赖
        get(target,key,receiver) {
            // 收集依赖
            track(target,key)
            //Reflect.get方法查找并返回target对象的keys属性，如果没有该属性，则返回undefined。
            const result =  Reflect.get(target,key,receiver)
            return covert(result)
        },

        set(target,key,value,receiver) {
            const oldValue = Reflect.get(target,key,receiver)
            let result = true
            if(oldValue !== value){
                result = Reflect.set(target, key, value, receiver)
                // 触发更新
                trigger(target,key)
            }
            return result
        },

        deleteProperty(target, key) {
            const hadKey = hasOwn(target, key)
            const result = Reflect.deleteProperty(target, key)
            if(hadKey && result) {
                // 触发更新
                trigger(target,key)
            }
            return result
        }
    }
    return new Proxy(target,handle)
}

/**
 * 
 * @param {*} callback 接收一个函数
 */
let activeEffect = null
export function effect(callback) {
    activeEffect = callback
    callback() // 访问响应式对象属性，去收集依赖
    activeEffect = null  //如果有嵌套的话，是一个递归的过程
}

let targetMap = new WeakMap()
/**
 * 收集依赖
 * @param {*} target 目标对象
 * @param {*} key target属性名称
 */
export function track(target,key) {
    if(!activeEffect) return;
    let depsMap = targetMap.get(target)
    if(!depsMap) {
        targetMap.set(target,(depsMap = new Map()))
    }
    let dep = depsMap.get(key)
    if(!dep){
        depsMap.set(key,(dep = new Set()))
    }
    dep.add(activeEffect)
}

/**
 * 触发更新
 * @param {*} target 目标对象
 * @param {*} key target属性名称
 */
export function trigger(target, key) {
    const depsMap = targetMap.get(target)
    if(!depsMap) return;
    const dep = depsMap.get(key)
    if(dep) {
        dep.forEach(effect=>{
            effect()
        })
    }
}

/**
 * 把基本类型的数据转化为响应式数据
 */
export function ref(raw) {
    //判断raw 是否是ref创建的对象，如果是的话，直接返回
    if(isObject(raw) && raw.__v_isRef) return;
    let value = covert(raw)
    const r = {
        __v_isRef:true,
        get value() {
            track(r,'value')
            return value
        },
        set value(newValue) {
            if(newValue !== value) {
                raw = newValue
                // 如果给value重新赋值成对象，依然是响应式的，因为covert里面调用了receiver
                value = covert(raw)
                trigger(r,'value')
            }
        }
    }
    return r;
}

/**
 * 把所有的属性都转化成ref
 * @param {*} proxy 
 */
export function toRefs(proxy) {
    // 判断这个参数是否是reactive创建的对象，如果不是的话，发送警告，这步跳过

    const ret = proxy instanceof Array ? new Array(proxy.length) : {}
    for(let key in proxy) {
        ret[key] = toProxyRef(proxy,key)
    }
    return ret;
}

export function computed(getter) {
    const result = ref()

    effect(()=>{
        result.value = getter()
    })

    return result
}

/**
 * 把属性转化成ref返回的属性
 */
function toProxyRef(proxy,key) {
    const r = {
        __v_isRef:true,
        get value() {
            return proxy[key]
        },
        set value(newValue) {
            proxy[key] = newValue
        }
    }
    return r
}
