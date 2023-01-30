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
// 优点：继承了父类的模板，又继承了父类的原型对象
// 缺点 1、原型对象的所有属性都被共享了，这样如果不小心修改了原型对象中的引用类型属性，那么所有子类创建的实例对象都会受到影响
//      2、创建子类时，无法向父类构造函数传参数


// 2、构造函数继承（借助 call）
// 原理 在子类构造函数内部使用call或apply来调用父类构造函数
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

//优点：解决了原型链继承中子类实例共享父类引用对象的问题，实现多继承，创建子类实例时，可以向父类传递参数
//缺点：只能继承父类的实例属性和方法，不能继承原型属性或者方法

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

//优点：1、可以继承父类实例属性和方法，也能够继承父类原型属性和方法
// 2、弥补了原型链继承中引用属性共享的问题
// 3、可传参，可复用
// 缺点：父类构造函数会被调用两次

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


// ES6中的继承：

// 主要是依赖extends关键字来实现继承，且继承的效果类似于寄生组合继承
// 使用了extends实现继承不一定要constructor和super，因为没有的话会默认产生并调用它们
// extends后面接着的目标不一定是class，只要是个有prototype属性的函数就可以了

// super相关：
// 在实现继承时，如果子类中有constructor函数，必须得在constructor中调用一下super函数，因为它就是用来产生实例this的。
// super有两种调用方式：当成函数调用和当成对象来调用。
// super当成函数调用时，代表父类的构造函数，且返回的是子类的实例，也就是此时super内部的this指向子类。在子类的constructor中super()就相当于是Parent.constructor.call(this)。
// super当成对象调用时，普通函数中super对象指向父类的原型对象，静态函数中指向父类。且通过super调用父类的方法时，super会绑定子类的this，就相当于是Parent.prototype.fn.call(this)。

// ES5继承和ES6继承的区别：

// 在ES5中的继承(例如构造继承、寄生组合继承) ，实质上是先创造子类的实例对象this，然后再将父类的属性和方法添加到this上(使用的是Parent.call(this))。
// 而在ES6中却不是这样的，它实质是先创造父类的实例对象this(也就是使用super())，然后再用子类的构造函数去修改this。