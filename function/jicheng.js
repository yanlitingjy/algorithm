// 1、原型链继承
function Parent1(){
    this.name = 'parent1';
    this.play = [1, 2, 3]
}
function Child1(){
    this.type = 'child2';
}
Child1.prototype = new Parent1()

console.log(new Child1())
var s1 = new Child1();
var s2 = new Child1();
s1.play.push(4);
console.log(s1.play, s2.play); // [1,2,3,4]
// 存在问题  改变s1的play属性，会发现s2也跟着发生变化了 这是因为两个实例使用的是同一个原型对象，内存空间是共享的


// 2、构造函数继承（借助 call）
function Parent2(){
    this.name = 'parent1';
    this.play = [1, 2, 3]
}
Parent2.prototype.getName = function () {
    return this.name;
}
function Child2(){
    Parent2.call(this);  
    this.type = 'child2';
}

let child2 = new Child2();
console.log(child2);  // 没问题
console.log(child2.getName());  // 会报错

//存在问题  方式一已经解决
//父类的引用属性不会被共享，但是只能继承父类的实例属性和方法，不能继承原型属性或者方法

// 3、组合继承
function Parent3(){
    this.name = 'parent3';
    this.play = [1, 2, 3]
}
Parent3.prototype.getName = function () {
    return this.name;
}
function Child3(){
    // 第二次调用 Parent3()
    Parent3.call(this);  
    this.type = 'child2';
}
// 第一次调用 Parent3()
Child3.prototype = new Parent3()
// 手动挂上构造器，指向自己的构造函数
Child3.prototype.constructor = Child3;

var s3 = new Child3();
var s4 = new Child3();
s3.play.push(4);
console.log(s3.play, s4.play);  // 不互相影响
console.log(s3.getName()); // 正常输出'parent3'
console.log(s4.getName()); // 正常输出'parent3'
//方式一和方式二解决了，但是Parent3 执行了两次，造成了多构造一次的性能开销 

// 4、原型式继承  主要借助Object.create方法实现普通对象的继承
let parent4 = {
    name: "parent4",
    friends: ["p1", "p2", "p3"],
    getName: function() {
      return this.name;
    }
};

let person4 = Object.create(parent4);
person4.name = "tom";
person4.friends.push("jerry");

let person5 = Object.create(parent4);
person5.friends.push("lucy");
console.log(person4.name); // tom
console.log(person4.name === person4.getName()); // true
console.log(person5.name); // parent4
console.log(person4.friends); // ["p1", "p2", "p3","jerry","lucy"]
console.log(person5.friends); // ["p1", "p2", "p3","jerry","lucy"]
// 存在的问题  object.create方法实现的是浅拷贝，多个实例的引用类型属性指向相同的内存，存在篡改的可能

// 5、寄生式继承
let parent5 = {
    name: "parent5",
    friends: ["p1", "p2", "p3"],
    getName: function() {
        return this.name;
    }
};

function clone(original) {
    // Object.create 方法，第一个参数就是这个对象的原型
    let clone = Object.create(original);
    clone.getFriends = function() {
        return this.friends;
    };
    return clone;
}

let person7 = clone(parent5);
person7.friends.push("lucy");
console.log(person7.getName()); // parent5
console.log(person7.getFriends()); // ["p1", "p2", "p3", "lucy"]
console.log(person7.friends)// ["p1", "p2", "p3", "lucy"]

let person8 = clone(parent5);
person8.friends.push("zzz");
console.log(person8.getName()); // parent5
console.log(person8.getFriends()); // ["p1", "p2", "p3", "lucy", "zzz"]
console.log(person8.friends)// ["p1", "p2", "p3", "lucy", "zzz"]
// 缺点和原型式继承一样(两个实例使用的是同一个原型对象，内存空间是共享的)

// 6、寄生组合式继承
// 借助解决普通对象的继承问题的Object.create 方法，在前面几种继承方式的优缺点基础上进行改造，这也是所有继承方式里面相对最优的继承方式
function clone (parent, child) {
    // 这里改用 Object.create 就可以减少组合继承中多进行一次构造的过程
    child.prototype = Object.create(parent.prototype);
    child.prototype.constructor = child;
}

function Parent6() {
    this.name = 'parent6';
    this.play = [1, 2, 3];
}
Parent6.prototype.getName = function () {
    return this.name;
}
function Child6() {
    Parent6.call(this);
    this.friends = 'child5';
}

clone(Parent6, Child6);

Child6.prototype.getFriends = function () {
    return this.friends;
}

let person6 = new Child6();
console.log(person6); //{friends:"child5",name:"child5",play:[1,2,3],__proto__:Parent6}
console.log(person6.getName()); // parent6
console.log(person6.getFriends()); // child5


//用到的继承
// 1.ts接口的继承
// 2、类的继承