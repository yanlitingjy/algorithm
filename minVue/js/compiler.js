class Compiler{
    constructor(vm){
        this.el = vm.$el
        this.vm = vm
        this.compile(this.el)
    }
    //编译模板
    compile(el){
        let childNodes = el.childNodes
        Array.from(childNodes).forEach(node=>{
            if(this.isTextNode(node)){ //处理文本节点
                this.compileText(node)
            }else if(this.isElementNode(node)){ //处理元素节点
                this.compileElement(node)
            }
            //判断node节点，是否有子节点，如果有子节点，要递归调用compile
            if(node.childNodes && node.childNodes.length){
                this.compile(node)
            }
        })
    }
    //编译元素节点，处理指令
    compileElement(node){
        //遍历所有的属性节点
        Array.from(node.attributes).forEach(attr=>{
            let attrName = attr.name
            //判断是否是指令
            if(this.isDirective(attrName)){
                attrName = attrName.substr(2)
                let key = attr.value
                this.update(node,key,attrName)
            }
        })
    }
    // 不同指令所调用的函数
    update(node,key,attrName){
        let updateFn = this[attrName+'Updater']
        // 处理 v-on 指令
        if (attrName.startsWith('on:')) {
            updateFn = this['on' + 'Updater']
            const eventType = attrName.split(':')[1]
            updateFn.call(this, node, this.vm[key], key, eventType)
            return
        }
        updateFn && updateFn.call(this,node,key,this.vm[key])
    }
    //处理v-text
    textUpdater(node,key,value){
        node.textContent = value
        //创建watcher对象,数据改变更新视图
        new Watcher(this.vm,key,(newValue)=>{
            node.textContent = newValue
        })
    }
    //处理v-model
    modelUpdater(node,key,value){
        node.value = value
        //创建watcher对象,数据改变更新视图
        new Watcher(this.vm,key,(newValue)=>{
            node.value = newValue
        })
        //双向绑定
        node.addEventListener('input',()=>{
            this.vm[key] = node.value
        })
    }
    // 处理 v-html 指令
    htmlUpdater(node, value, key) {
        node.innerHTML = value
        new Watcher(this.vm, key, (newValue) => {
            node.innerHTML = newValue
        })
    }
    // 处理 v-on 指令
    onUpdater(node, value, key, eventType) {
        node.addEventListener(eventType, this.vm.$options.methods[key])
    }
    //编译文本节点，处理差值表达式
    compileText(node){
        let reg = /\{\{(.+?)\}\}/
        let value = node.textContent
        if(reg.test(value)){
            let key = RegExp.$1.trim()
            node.textContent = value.replace(reg,this.vm[key])

            //创建watcher对象,数据改变更新视图
            new Watcher(this.vm,key,(newValue)=>{
                node.textContent = newValue
            })
        }
    }
    //判断元素的属性是否是指令
    isDirective(attrName){
        return attrName.startsWith('v-')
    }
    //判断节点是否是文本节点
    isTextNode(node){
        return node.nodeType === 3
    }
    //判断节点是否是元素节点
    isElementNode(node){
        return node.nodeType === 1
    }
}