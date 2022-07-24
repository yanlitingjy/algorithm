//instanceof 主要的实现原理就是构造函数的原型对象在实例对象的原型链上
//因此，instanceof 在查找的过程中会遍历 实例对象 （左边）的原型链，直到找到构造函数（右边）的 prototype，如果查找失败，则会返回 false。

/**
 * 构造函数的原型对象属性是否在某个实例对象的原型链上
 * @param {*} left 实例对象
 * @param {*} right 构造函数
 * @returns BoolRen
 */
function myInstanceof(left, right) { 
    // 这里先用typeof来判断基础数据类型，如果是，直接返回false
    if (typeof left !== 'object' || left === null) return false
    let L = left.__proto__;
    while(true) {
        if(L === null) return false;
        if(L === right.prototype) return true
        L = L.__proto__
    }
}
function food(name,color,size) {
    this.name = name;
    this.color = color;
    this.size = size;
}
var apple = new food('redApple', 'RED', 'small');
console.log(apple instanceof food); //true
