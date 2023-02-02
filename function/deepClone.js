// 区别
//浅拷贝 如果属性是基本类型，拷贝的就是基本类型的值；如果属性是引用类型，拷贝的就是内存地址。
//       即浅拷贝是拷贝一层，深层次的引用类型则共享内存地址。常用的方法有：object.assgin，扩展运算符等等
//深拷贝 会另外创造一个一模一样的对象，新对象跟原对象不共享内存，修改新对象不会改到原对象
//       递归拷贝深层次，属性为对象时，深拷贝是新开栈，两个对象指向不同的地址


/**
 * 浅拷贝  实现方式 Object.assign()   concat()  拓展运算符 ... 
 * @param {*} obj 
 * @returns 
 */
function shallowClone(obj) {
    if(!isObject(obj)) return false;
    let newObj = Array.isArray(obj)?[]:{}
    for(let key in obj) {
        //判断一个对象是否包含自定义属性而不是原型链上的属性
        if(obj.hasOwnProperty(key)){
            newObj[key] = obj[key];
        }
    }
    return newObj;
}
/**
 * 深拷贝  会忽略undefined、symbol和函数
 * @param {*} obj 
 * @returns 
 */
function deepClone(obj){
    if(!isObject(obj)) return false
    let newObj = Array.isArray(obj) ? [] :{}
    for(let key in obj){
        if(obj.hasOwnProperty(key)){
            if(isObject(obj[key])){
                newObj[key] = deepClone(obj[key])
            }else{
                newObj[key] = obj[key]
            }
        }
    }
}

/**
 * 利用 WeakMap 类型作为 Hash 表，因为 WeakMap 是弱引用类型，可以有效防止内存泄漏）
 * 如果存在循环，则引用直接返回 WeakMap 存储的值。（判断一个对象的字段是否引用了这个对象或这个对象的任意父级）
 * 深拷贝 循环递归 
 * @param {Object} obj 要拷贝的对象
 * @param {Map} hash 用于存储循环引用对象的地址
 */

function deepClone(obj, hash = new WeakMap()) {
    if (obj === null) return obj; // 如果是null或者undefined我就不进行拷贝操作
    if (obj instanceof Date) return new Date(obj);
    if (obj instanceof RegExp) return new RegExp(obj);
    // 可能是对象或者普通的值  如果是函数的话是不需要深拷贝
    if (typeof obj !== "object") return obj;
    // 是对象的话就要进行深拷贝
    if (hash.get(obj)) return hash.get(obj);
    // Object.getPrototypeOf 返回指定对象的原型（内部[[Prototype]]属性的值）
    let cloneObj = Object.create(Object.getPrototypeOf(obj))
    hash.set(obj, cloneObj);
    for (let key in obj) {
    //for (let key of Reflect.ownKeys(obj)) {  // 能够遍历对象的不可枚举属性以及 Symbol 类型
        if (obj.hasOwnProperty(key)) {  //hasOwnProperty 作用是在一个对象里面找是否有某个属性或对象， 但是不会在它的原型中找， 返回boolean类型 
            if(isObject(obj[key])){
                cloneObj[key] = deepClone(obj[key],hash)
            }else{
                cloneObj[key] = obj[key]
            }
        }
    }
    return cloneObj;
  }

/**
 * 判断是否是对象
 * @param {*} obj 
 * @returns 
 */
function isObject(obj){
    return Object.prototype.toString.call(obj) === '[object Object]'  || Object.prototype.toString.call(obj) === '[object Array]'
}