// 实现一个订阅器 Dep：
// 订阅器采用 发布-订阅 设计模式，用来收集订阅者 Watcher
// 对监听器 Observer 和 订阅者 Watcher 进行统一管理。
class Dep{
    constructor(){
        //存储所有的观察者
        this.subs = []
    }
    //添加观察者
    addSub(sub){
        if(sub && sub.update){
            this.subs.push(sub)
        }
    }
    //发送通知
    notify(){
        this.subs.forEach(sub=>{
            sub.update()
        })
    }
}