// 1、使用Promise实现每隔1秒输出1,2,3
// 思路 Promise 配合reduce 不停的在promise后面叠加.then

const arr = [1,2,3]
arr.reduce((p,x)=>{
    return p.then(()=>{
        return new Promise(r=>{
            setTimeout(()=>r(console.log(x)),1000)
        })
    })
},Promise.resolve())

//2、使用Promise实现红绿灯交替重复亮
// 红灯3秒亮一次，黄灯2秒亮一次，绿灯1秒亮一次；如何让三个灯不断交替重复亮灯？（用Promise实现）三个亮灯函数已经存在：

function red() {
    console.log('red');
}
function green() {
    console.log('green');
}
function yellow() {
    console.log('yellow');
}

const light = function(timer,cb) {
    return new Promise(resolve=>{
        setTimeout(()=>{
            cb()
            resolve()
        },timer)
    })
}

const step = function() {
    Promise.resolve().then(()=>{
        return light(3000,red)
    }).then(()=>{
        return light(2000,green)
    }).then(()=>{
        return light(1000,yellow)
    }).then(()=>{
        return step()
    })
}

step()


// 3、封装一个异步加载图片的方法
function loadImg(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = function() {
            console.log("一张图片加载完成");
            resolve(img);
        };
        img.onerror = function() {
            reject(new Error('Could not load image at' + url));
        };
        img.src = url;
    });
}

// 4、实现mergePromise函数
// 实现mergePromise函数，把传进去的数组按顺序先后执行，并且把返回的数据先后放到数组data中
const time = (timer) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, timer)
    })
}
const ajax1 = () => time(2000).then(() => {
    console.log(1);
    return 1
})
const ajax2 = () => time(1000).then(() => {
    console.log(2);
    return 2
})
const ajax3 = () => time(1000).then(() => {
    console.log(3);
    return 3
})

function mergePromise (ajaxArr) {
    // 在这里写代码
    let data = []
    let promise = Promise.resolve()
    
    ajaxArr.forEach(ajax => {
        // 第一次的then为了用来调用ajax
        // 第二次的then是为了获取ajax的结果
      promise = promise.then(ajax).then(res => {
            data.push(res);
            return data; // 把每次的结果返回
        })
    })
    return promise;
}

mergePromise([ajax1, ajax2, ajax3]).then(data => {
    console.log("done");
    console.log(data); // data 为 [1, 2, 3]
});
  