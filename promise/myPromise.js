/*** 1. 是个构造函数 
 * * 2. 传⼊⼀个可执⾏函数 函数的⼊参第⼀个为 fullFill函数 第⼆个为 reject函数； 函数⽴即执⾏ 
 * * 3. 状态⼀旦更改就不可以变更 只能 pending => fulfilled 或者 pending => rejected 
 * * 4. then 的时候要处理⼊参的情况 successCallback 和failCallback 均可能为⾮函数 
 * *    默认的 failCallback ⼀定要将异常抛出， 这样下⼀个promise便可将其捕获 异常冒泡的⽬的 
 * * 5. then 中执⾏回调的时候要捕获异常 将其传给下⼀个promise 
 * *    如果promise状态未变更 则将回调⽅法添加到对应队列中 
 * *    如果promise状态已经变更 需要异步处理成功或者失败回调 
 * *    因为可能出现 回调结果和当前then返回的Promise⼀致 从⽽导致死循环问题 
 * * 6. catch只是then的⼀种特殊的写法 ⽅便理解和使⽤ 
 * * 7. finally 特点 1. 不过resolve或者reject都会执⾏
 * *                 2. 回调没有参数 
 * *                 3. 返回⼀个Promise 且值可以穿透到下⼀个then或者catch
 * * 8. Promise.resolve, Promise.reject 根据其参数返回对应的值 或者状态的Promise即可 
 * * 9. Promise.all 特点 1. 返回⼀个Promise 
 * *                   2. ⼊参是数组 resolve的情况下出参也是数组 且结果顺序和调⽤顺序⼀致 
 * *                   3. 所有的值或者promise都完成才能resolve 所有要计数 
 * *                   4. 只要有⼀个为reject 返回的Promise便reject 
 * * 10. Promise.race 特点 1. 返回⼀个Promise 
 * *                      2. ⼊参是数组 那么出参根据第⼀个成功或者失败的参数来确定 
 * *                     3. 只要有⼀个resolve 或者reject 便更改返回Promise的状态
 *  ***/
const PENDING = 'pending'; // 等待
const FULFILLED = 'fulfilled'; // 成功
const REJECTED = 'rejected'; // 失败

class MyPromise {
  constructor(executor) {
    try {
      executor(this.resolve, this.reject)
    } catch (e) {
      this.reject(e);
    }
    // executor(
    //   (value)=>asyncExecFun(()=>this.resolve(value)),
    //   (reason)=>asyncExecFun(()=>this.reject(reason))
    // )
  }
  // promsie 状态 
  status = PENDING;
  // 成功之后的值
  value = undefined;
  // 失败后的原因
  reason = undefined;
  // 成功回调
  successCallback = [];
  // 失败回调
  failCallback = [];

  resolve = value => {
    // 如果状态不是等待 阻止程序向下执行
    if (this.status !== PENDING) return;
    // 将状态更改为成功
    this.status = FULFILLED;
    // 保存成功之后的值
    this.value = value;
    // 判断成功回调是否存在 如果存在 调用
    // this.successCallback && this.successCallback(this.value);
    while (this.successCallback.length) this.successCallback.shift()()
  }
  reject = reason => {
    // 如果状态不是等待 阻止程序向下执行
    if (this.status !== PENDING) return;
    // 将状态更改为失败
    this.status = REJECTED;
    // 保存失败后的原因
    this.reason = reason;
    // 判断失败回调是否存在 如果存在 调用
    // this.failCallback && this.failCallback(this.reason);
    while (this.failCallback.length) this.failCallback.shift()()
  }
  then(successCallback, failCallback) {
    // 参数可选
    successCallback = successCallback ? successCallback : value => value;
    // 参数可选
    failCallback = failCallback ? failCallback : reason => {
      throw reason
    };
    let promsie2 = new MyPromise((resolve, reject) => {
      // 判断状态
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            let x = successCallback(this.value);
            // 判断 x 的值是普通值还是promise对象
            // 如果是普通值 直接调用resolve 
            // 如果是promise对象 查看promsie对象返回的结果 
            // 再根据promise对象返回的结果 决定调用resolve 还是调用reject
            resolvePromise(promsie2, x, resolve, reject)
          } catch (e) {
            reject(e);
          }
        }, 0)
      } else if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = failCallback(this.reason);
            // 判断 x 的值是普通值还是promise对象
            // 如果是普通值 直接调用resolve 
            // 如果是promise对象 查看promsie对象返回的结果 
            // 再根据promise对象返回的结果 决定调用resolve 还是调用reject
            resolvePromise(promsie2, x, resolve, reject)
          } catch (e) {
            reject(e);
          }
        }, 0)
      } else {
        // 等待
        // 将成功回调和失败回调存储起来
        this.successCallback.push(() => {
          setTimeout(() => {
            try {
              let x = successCallback(this.value);
              // 判断 x 的值是普通值还是promise对象
              // 如果是普通值 直接调用resolve 
              // 如果是promise对象 查看promsie对象返回的结果 
              // 再根据promise对象返回的结果 决定调用resolve 还是调用reject
              resolvePromise(promsie2, x, resolve, reject)
            } catch (e) {
              reject(e);
            }
          }, 0)
        });
        this.failCallback.push(() => {
          setTimeout(() => {
            try {
              let x = failCallback(this.reason);
              // 判断 x 的值是普通值还是promise对象
              // 如果是普通值 直接调用resolve 
              // 如果是promise对象 查看promsie对象返回的结果 
              // 再根据promise对象返回的结果 决定调用resolve 还是调用reject
              resolvePromise(promsie2, x, resolve, reject)
            } catch (e) {
              reject(e);
            }
          }, 0)
        });
      }
    });
    return promsie2;
  }
  finally(callback) {
    return this.then(value => {
      return MyPromise.resolve(callback()).then(() => value);
    }, reason => {
      return MyPromise.resolve(callback()).then(() => {
        throw reason
      })
    })
  } catch (failCallback) {
    return this.then(undefined, failCallback)
  }
  static all(array) {
    // 存储结果 
    let result = [];
    // 定义当前MyPromise的索引 
    let index = 0;
    // 创建返回MyPromise 
    return new MyPromise((resolve, reject) => {
      function addData(key, value) {
        result[key] = value;
        index++;
        // 全部执⾏完则resolve 
        if (index === array.length) {
          resolve(result);
        }
      }
      for (let i = 0; i < array.length; i++) {
        let current = array[i];
        if (current instanceof MyPromise) {
          // promise 对象
          current.then(value => addData(i, value), reason => reject(reason))
        } else {
          // 普通值
          addData(i, array[i]);
        }
      }
    })
  }
  static resolve(value) {
    // 如果是MyPromise 实例 则直接返回 
    if (value instanceof MyPromise) return value;
    // 否则返回⼀个 MyPromise实例 
    return new MyPromise(resolve => resolve(value));
  }
  // 只要有⼀个成功或者失败就返回 
  static race(array) {
    let promise = new MyPromise((resolve, reject) => {
      for (let i = 0; i < array.length; i++) {
        let curr = array[i];
        // MyPromise实例 结果处理 
        if (curr instanceof MyPromise) {
          curr.then(resolve, reject);
        } else {
          // ⾮MyPromise实例处理 
          resolve(curr);
        }
      }
    });
    return promise;
  }
}

// 异步执⾏⽅法封装
function asyncExecFun(fn) {
  setTimeout(() => fn(), 0);
}

function resolvePromise(promsie2, x, resolve, reject) {
  if (promsie2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
  }
  if (x instanceof MyPromise) {
    // promise 对象
    // x.then(value => resolve(value), reason => reject(reason));
    x.then(resolve, reject);
  } else {
    // 普通值
    resolve(x);
  }
}

module.exports = MyPromise;