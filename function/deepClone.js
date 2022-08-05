// 区别
//浅拷贝和深拷贝都创建出一个新的对象，但在复制对象属性的时候，行为不一样
//浅拷贝只复制属性指向某个对象的指针，而不复制对象本身，新旧对象还是共享同一块内存，修改对象属性会影响原对象
//深拷贝会另外创造一个一模一样的对象，新对象跟原对象不共享内存，修改新对象不会改到原对象

//浅拷贝是拷贝一层，属性为对象时，浅拷贝是复制，两个对象指向同一个地址

//深拷贝是递归拷贝深层次，属性为对象时，深拷贝是新开栈，两个对象指向不同的地址
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
 * 深拷贝  JSON.stringify()  JSON.parse()  会忽略undefined、symbol和函数
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
// 循环递归 
// 利用 WeakMap 类型作为 Hash 表，因为 WeakMap 是弱引用类型，可以有效防止内存泄漏）
// 如果存在循环，则引用直接返回 WeakMap 存储的值。（判断一个对象的字段是否引用了这个对象或这个对象的任意父级）

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