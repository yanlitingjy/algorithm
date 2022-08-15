let _Vue = null

export default class VueRouter {
    static install(Vue) {
        // 1、判断当前插件是否被安装
        if(VueRouter.install.installed) {
            return ;
        }
        VueRouter.install.installed = true
        //2 把Vue的构造函数记录在全局
        _Vue = Vue
        //3 把创建Vue的实例传入的router对象注入到Vue实例
        // _Vue.prototype.$router = this.$options.router
        // 混入
        _Vue.mixin({
            beforeCreate() {
                if(this.options.router){
                    _Vue.prototype.$router = this.options.router
                }
            }
        })
    }
    // 初始化属性
    constructor(options) {
        // options 记录构造函数传入的对象
        this.options = options
        this.mode = options.mode || 'hash'
        // routeMap 路由地址和组件的对应关系
        this.routeMap = {} 
        //observable  data 是一个响应式对象
        this.data = _Vue.observable({
            current: '/'  // 当前路由地址
        })
        this.init()
    }
    init() {
        this.createRouteMap()
        this.initComponent(_Vue)
        this.initEvent()
    }
    // 用来初始化 routeMap 属性，路由规则转换为键值对
    createRouteMap() {
         //遍历所有的路由规则 把路由规则解析成键值对的形式存储到routeMap中
        this.$options.routes.forEach(route=>{
            this.routeMap[route.path] = route.component
        })
    }
    // 路由模式是否是hash模式
    isHash(mode){
		return mode === 'hash'
	}
     // 用来创建 router-link 和 router-view 组件
    initComponent(Vue) {
        // route-link
        const self = this; //这里的 this 指向 vueRouter 实例
        Vue.component('route-link',{
            props:{
                to:String
            },
            // render --- 可在 vue 运行时版直接使用
            render(h) {
                // h(选择器（标签的名字）， 属性，生成的某个标签的内容)
                return h('a',{
                    attrs: {
                        href:self.isHash(self.mode) ? '#' + this.to : this.to
                    },
                    // 注册事件
                    on: {
                        click: this.clickHandler
                    }
                },[this.$slots.default]) // this.$slot.default 默认插槽
            },
            methods: {
                clickHandler(e) {
                    if(self.isHash(self.mode)) {
                        //hash模式是基于锚点的切换，不需要阻止默认事件
                        this.$router.data.current = this.to
                    }else {
                        //this代表当前router-link, 同样是一个vue实例
                        history.pushState({},'',this.to)
                        this.$router.data.current = this.to //改变data中的current属性
                        e.preventDefault()
                    }
                }
            }
        })
        //生成router-view组件
        Vue.component('route-view',{
            render(h) {
                let component = this.routeMap[self.data.current]
                return h(component) //h函数能帮我们将template转换成 虚拟dom
                // 此时 发现地址栏确实变化了，但是页面内容并没有去渲染，因为地址变化 就会去发送请求，而我们是单页面应用，找不到的
                // 因此，需要使用pushHistory方法， 地址栏变化，但不去发送请求，且将地址栏变化记录下来
                // 去修改router-link的默认行为
            }
        })
    }
    initEvent() {
         //注册浏览器popstate事件||hashchange事件，监听浏览器地址栏变化
        if(this.isHash(this.mode)) {  
            window.addEventListener('hashchange',() => {
                let hash = window.location.hash.slice(1) || '/';
                this.data.current = hash
            })
            window.addEventListener('load',() => {
                if (!window.location.hash) {
                    window.location.hash = '#/';
                }
            })
        }else {
            // 获取当前路由地址， 并为data中的current赋值
            window.addEventListener('popstate',()=>{
                this.data.current = window.location.pathname
            })
        }
    }
}