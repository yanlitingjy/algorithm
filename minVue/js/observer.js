// 监听器 observer
// 对数据对象进行遍历，包括子属性对象的属性，利用 Object.defineProperty() 对属性都加上 setter 和 getter。
// 这样的话，给这个对象的某个值赋值，就会触发 setter，那么就能监听到了数据变化
class Observer{
    constructor(data){
        this.walk(data)
    }
    walk(data){
        //1、判断data是否是对象
        if(!data || typeof data !=='object'){
            return;
        }
        //2、遍历data中所有的属性
        Object.keys(data).forEach(key=>{
            this.defineReactive(data,key,data[key])
        })
    }
    defineReactive(obj,key,value){
        let that = this
        // 负责收集依赖，并发送通知
        let dep = new Dep()
        // 如果value是对象的话，将对象里的属性也转化成响应式数据
        this.walk(value)
        Object.defineProperty(obj,key,{
            enumerable:true,
            configurable:true,
            get(){
                //收集依赖
                Dep.target && dep.addSub(Dep.target)
                return value
            },
            set(newValue){
                if(newValue === value) return;
                value = newValue
                that.walk(newValue)
                dep.notify()
            }
        })
    }
}