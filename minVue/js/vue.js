class Vue{
    constructor(options){
        //1、通过属性保存选项的数据
        this.$options = options || {}
        this.$data = options.data
        this.$el = typeof options.el === 'string'?document.querySelector(options.el) :options.el
        //2、把data中的成员转化成getter和setter，注入到vue实例中
        this._proxyData(this.$data)
        //3、调用observe对象，监听数据的变化
        new Observer(this.$data)
        //4、调用compiler对象，解析指令和差值表达式
        new Compiler(this)
    }
    _proxyData(data){
        //遍历data中所有的属性
        Object.keys(data).forEach(key=>{
            Object.defineProperty(this,key,{
                enumerable:true,
                configurable:true,
                get(){
                    return data[key]
                },
                set(newValue){
                    if(newValue === data[key]){
                        return
                    }
                    data[key] = newValue
                }
            })
        })
        //把data的属性注入到vue实例中
    }
}