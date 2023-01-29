// 在平时开发过程中，总是会遇到类似于通过obj.a.b.c的方式去获取对象深层包含的值，
// 但是，如果遇到a、b或者c是null、undefined、1、'2'和true等数据类型时就会出现报错。
// 而且，我们往往通过后端从数据库获取到的数据，这个链路中，
// 说不准哪一天就会在传递的过程中出现类似的情况。下面我们手写get方法，杜绝这种情况的发生。

let get = function(obj,path,defaultValue) {
    // 将路径拆成数组
    let pathArr = path.split('.')
    // 默认是传入的值
    let currentValue = obj
    for(let i=1;i<pathArr.length;i++) {
         // 边界1：如果上一次值不是对象，或者为null，或者为undefined，直接返回默认值
        if(currentValue === null || typeof currentValue !== 'object' || currentValue === undefined) {
            return defaultValue
        }
        // 当前路径
        let currentPath = pathArr[i]
        // 当前key的数组
        let keys = Object.keys(currentValue)
        // 边界2：当前路径不在上一次值的keys中，直接返回默认值
        if (!keys.includes(currentPath)) {
            return defaultValue;
        }
        // 获取当前路径下的值
        currentValue = currentValue[currentPath];
    }
    return currentValue;
}

// 测试1
let obj1 = {
    a: [{
        b: {
            c: 3
        }
    }]
}
console.log(get(obj1, 'obj1.a.0.b.c', -1)) // 3
console.log(get(obj1, 'obj1.a.d.c', -1)) // -1
console.log(get(obj1, 'obj1.a.b.c.f', -1)) // -1



