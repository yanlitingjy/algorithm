// 实现一个订阅者 Watcher
// Watcher 订阅者是 Observer 和 Compile 之间通信的桥梁
// 主要的任务是订阅 Observer 中的属性值变化的消息，
// 当收到属性值变化的消息时，触发解析器 Compile 中对应的更新函数。
class Watcher{
    constructor(vm,key,cb){
        this.vm = vm
        //data中的属性名称
        this.key = key
        //回调函数负责更新视图
        this.cb = cb
        //把watcher对象记录到Dep类静态属性target
        Dep.target = this
        //触发get方法，在get方法中调用addSub
        this.oldValue = vm[key]
        Dep.target = null
    }
    update(){
        let newValue = this.vm[this.key]
        if(this.oldValue === newValue){
            return;
        }
        this.cb(newValue)
    }
}