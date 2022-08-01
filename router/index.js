let _Vue = null
export default class VueRouter{
    static install(Vue){
        //1、判断当前插件是否被安装
        if(VueRouter.install.installed){
            return;
        }
        VueRouter.install.installed = true
        //2、把vue构造函数记录到全局变量
        _Vue = Vue
        //3、把创建vue实例时候传入的router对象注入到vue实例上
        //混入
        _Vue.mixin({
            beforeCreate(){
                if(this.$options.router){
                    _Vue.prototype.$router = this.$options.router
                }
            }
        })
    }
    constructor(options){
        this.options = options
        this.routeMap = {} //路由规则简析出来，存储到routeMap ，键值对
        this.data = _Vue.observable({//响应式对象
            current:'/' //当前路由地址
        })
        this.init()
    }
    init(){
        this.createRouteMap()
        this.initComponents(_Vue)
        this.initEvent()
    }
    //遍历所有路由规则，把路由规则简析成键值对存储到routeMap
    createRouteMap(){
        this.options.routes.forEach(route=>{
            this.routeMap[route.path] = route.component
        })
    }
    initComponents(Vue){
        Vue.component('router-link',{
            props:{
                to:String
            },
            //template:'<a :href="to"><slot></slot></a>'
            render(h){
                return h('a',{
                    attrs:{
                        href:this.to
                    },
                    on:{
                        click:this.clickHandler
                    }
                },[this.$slots.default])
            },
            methods:{
                clickHandler(e){
                    history.pushState({},'',this.to)
                    this.$router.data.current = this.to
                    e.preventDefault()
                }
            }
        })
        const self = this
        Vue.component('router-view',{
            render(h){
                const component = self.routeMap[self.data.current]
                return h(component)
            }
        })
    }

    initEvent(){
        window.addEventListener('popstate',()=>{
            this.data.current = window.location.pathname
        })
    }
}