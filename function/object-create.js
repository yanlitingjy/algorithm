// Object.create() 实现原理
// 自定义构造函数建立实例对象
let Ctr = function(){};
let obj3 = new Ctr();
obj3.__proto__ === Ctr.prototype; // true


// 调用：Object.create ( proto , propertiesObject )
// 返回： 一个新的实例对象

// 调用这个方法的时候接受两个参数，第一个参数作为返回对象的 __proto__，这个参数只能是 null 或者对象（而且不能是基本类型的包装对象）。
// 第二个参数作为返回对象的属性描述，它和 Object.defineProperties() 的第二个参数形式是一样的：

Object.create =  function (paramProto,propertiesObject) {
    if(typeof paramProto != 'object' && paramProto !== null){
        throw new Error('the first param must be an object or null')
    }
    if(propertiesObject === null){
        throw 'TypeError'
    }

    function F() { }
    F.prototype = paramProto;
    const obj = new F()

    // 处理传参 null 的情况
    if(paramProto === null){
        obj.__proto__ = paramProto
    }
    if(propertiesObject){
        Object.defineProperties(obj,propertiesObject)
    }
    return obj;
};

//上面代码中，最后返回了F的实例对象obj，那么也就是obj.__proto__ === F.prototype，
//而F.prototype = paramProto，也就作到了obj.__proto__ === paramProto


// 实现思路：将传入的对象作为原型
// 简化版
function create(obj) {
    function F() {}
    F.prototype = obj
    return new F()
}