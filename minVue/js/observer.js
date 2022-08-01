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
        //负责收集依赖，并发送通知
        let dep = new Dep()
        //如果value是对象的话，将对象里的属性也转化成响应式数据
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