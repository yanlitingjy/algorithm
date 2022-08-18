// 1、基础题
// 题目一
// const promise1 = new Promise((resolve, reject) => {
//     console.log('promise1')
// })
// console.log('1', promise1);

// 输出结果  promise1  '1' Promise{<pending>} 

// 题目二
// const promise = new Promise((resolve, reject) => {
//     console.log(1);
//     resolve('success')  // 遇到resolve('success')， 将promise的状态改为了resolved并且将值保存下来
//     console.log(2);
// });
// promise.then(() => {
//     console.log(3);
// });
// console.log(4);

// 输出结果  1 2 4  3 

// 题目三
// const promise = new Promise((resolve, reject) => {
//     console.log(1);
//     console.log(2);
// });
// promise.then(() => {
//     console.log(3);
// });
// console.log(4);

// 和题目二相似，只不过在promise中并没有resolve或者reject
// 因此promise.then并不会执行，它只有在被改变了状态之后才会执行。

// 输出结果  1 2 4 

// 题目四
// const promise1 = new Promise((resolve, reject) => {
//     console.log('promise1')
//     resolve('resolve1')
// })
// const promise2 = promise1.then(res => {
//     console.log(res)
// })
// console.log('1', promise1);
// console.log('2', promise2);
// 输出结果 promise1  1 Promise{<resolved>: 'resolve1'}  '2' Promise{<pending>}   resolve1

// 题目五
// const fn = () => (new Promise((resolve, reject) => {
//     console.log(1);
//     resolve('success')
// }))
// fn().then(res => {
//     console.log(res)
// })
// console.log('start')

// 输出结果  1 start success

// 题目六
// const fn = () =>
//     new Promise((resolve, reject) => {
//         console.log(1);
//         resolve("success");
//     });
// console.log("start");
// fn().then(res => {
//     console.log(res);
// });

// 输出结果 start 1 success

// 2. Promise结合setTimeout
// 题目一
// console.log('start')
// setTimeout(() => {
//     console.log('time')
// })
// Promise.resolve().then(() => {
//     console.log('resolve')
// })
// console.log('end')
// 输出结果 start end  resolve  time 

// 题目二
// const promise = new Promise((resolve, reject) => {
//     console.log(1);
//     setTimeout(() => {
//         console.log("timerStart");
//         resolve("success");
//         console.log("timerEnd");
//     }, 0);
//     console.log(2);
// });
// promise.then((res) => {
//     console.log(res);
// });
// console.log(4);

//过程分析：
// 从上至下，先遇到new Promise，执行该构造函数中的代码1
// 然后碰到了定时器，将这个定时器中的函数放到下一个宏任务的延迟队列中等待执行
// 执行同步代码2
// 跳出promise函数，遇到promise.then，但其状态还是为pending，这里理解为先不执行
// 执行同步代码4
// 一轮循环过后，进入第二次宏任务，发现延迟队列中有setTimeout定时器，执行它
// 首先执行timerStart，然后遇到了resolve，将promise的状态改为resolved且保存结果并将之前的promise.then推入微任务队列
// 继续执行同步代码timerEnd
// 宏任务全部执行完毕，查找微任务队列，发现promise.then这个微任务，执行它。

// 输出结果  1 2 4 timerStart timerEnd success

// 题目三
// setTimeout(() => {
//     console.log('timer1');
//     setTimeout(() => {
//         console.log('timer3')
//     }, 0)
// }, 0)
// setTimeout(() => {
//     console.log('timer2')
// }, 0)
// console.log('start')
// 输出结果  start timer1 timer2 timer3
// setTimeout(() => {
//     console.log('timer1');
//     Promise.resolve().then(() => {
//         console.log('promise')
//     })
// }, 0)
// setTimeout(() => {
//     console.log('timer2')
// }, 0)
// console.log('start')
// 输出结果  start timer1 promise timer2

// 题目四
Promise.resolve().then(() => {
    console.log('promise1');
    const timer2 = setTimeout(() => {
        console.log('timer2')
    }, 0)
});
const timer1 = setTimeout(() => {
    console.log('timer1')
    Promise.resolve().then(() => {
        console.log('promise2')
    })
}, 0)
console.log('start');
// 输出结果 start promise1  timer1 promise2 timer2

// 题目五
// const promise1 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve('success')
//     }, 1000)
// })
// const promise2 = promise1.then(() => {
//     throw new Error('error!!!')
// })
// console.log('promise1', promise1)
// console.log('promise2', promise2)
// setTimeout(() => {
//     console.log('promise1', promise1)
//     console.log('promise2', promise2)
// }, 2000)

// 输出结果  
// promise1 promise1<pending>  
// promise2 promise2<pending> 
// test5.html:102 Uncaught (in promise) Error: error!!! at test.html:102
//'promise1' Promise{<resolved>: "success"}  
//'promise2' Promise{<rejected>: Error: error!!!}

// 题目六
const promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("success");
        console.log("timer1");
    }, 1000);
    console.log("promise1里的内容");
});
const promise2 = promise1.then(() => {
    throw new Error("error!!!");
});
console.log("promise1", promise1);
console.log("promise2", promise2);
setTimeout(() => {
    console.log("timer2");
    console.log("promise1", promise1);
    console.log("promise2", promise2);
}, 2000);

// promise1里的内容  
// promise1 promise1<pending>  
// promise2 promise2<pending>
// timer1
// test5.html:102 Uncaught (in promise) Error: error!!! at test.html:102
// timer2
// promise1 Promise{<resolved>: "success"}
// 'promise2' Promise{<rejected>: Error: error!!!}

// 3. Promise中的then、catch、finally
// 题目一

// 题目二

// 题目三

// 题目四