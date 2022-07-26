/**
 * 
 * @param {*} func  构造函数
 * @param  {...any} args 构造函数的参数 param1, param2, …
 * @returns 对象
 */
function myNew(func,...args){   // ...args 是将传过来的参数解构成数组
    console.log(args)  // 此时args 是个数组 ['huihui',123]
    // 1、创建一个空对象
    let obj = Object.create(null)
    // 2、新对象的原型指向构造函数原型对象
    obj.__proto__ = func.prototype   // __proto__   == [[prototype]]
    // 3、将构造函数this指向新对象并执行
    result = func.apply(obj,args)
    // 4、根据构建函数返回类型作判断，如果是原始值则被忽略，返回新对象，如果是返回对象，需要正常处理
    return result == 'object'?result:obj
}

// 测试代码
function Person(name, age) {
    this.name = name;
    this.age = age;
}
Person.prototype.say = function () {
    console.log(this.name)
}

let p = myNew(Person, "huihui", 123)
console.log(p) // Person {name: "huihui", age: 123}
p.say() 