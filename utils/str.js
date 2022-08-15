

//如：字符串abccba，从前往后读是a-b-c-c-b-a；从后往前读也是a-b-c-c-b-a
function reverse1(str){
    return str === str.split('').reverse().join('')
}

function reverse2(str){
    let len = str.length;
    let middle = Math.floor(len / 2)
    let flag = false
    for(let i=0;i<middle;i++){
        if(str.charAt(i) === str.charAt(len-1-i)){
            flag = true
        }else{
            flag = false
        }
    }
    return flag;
}

//递归尾阶乘
function factorial(num) {
    if(num <= 1) return 1;
    return num * factorial(num - 1);
}

// 字符串出现最多次数的字母
function findMoreLetter(str){
    let arr = [],container = {}
    arr = str.split('')
    for(let i=0;i<arr.length;i++){
        if(container[arr[i]]){
            container[arr[i]] ++
        }else{
            container[arr[i]] = 1
        }
    }
    let maxKey = 0; maxValue = ''
    for(let k in container){
        if(container[k]>maxKey){
            maxNumber =container[k]
            maxValue = k
        }
    }
    return maxValue+'最多出现了'+maxNumber+'次'
}
//var str = 'abbbuyymmckhdtgdj'
//console.log(findMoreLetter(str))

// 找出下列正数组的最大差值
var arr2 = [10,5,11,7,9,12]
function findMaxProfit1(arr){
    let max = arr[0]
    let min = arr[1]
    for(let i=0;i<arr.length;i++){
        if(arr[i]>max){
            max = arr[i]
        }
        if(arr[i]<min){
            min = arr[i]
        }
    }
    return max - min
}
function findMaxProfit2(arr){
    let newArr = arr.sort((a,b)=>{
        if(a>b){
            return 1
        }else {
            return -1
        }
    })
    console.log(newArr)
    return newArr[newArr.length-1] - arr[0]
}
console.log(findMaxProfit2(arr2))

//实现一个算法，随机生成指制定长度的字符窜 比如给定 长度 8 输出 4ldkfg9j
function randomString(n){
    let str = 'abcdefghijklmnopqrstuvwxyz9876543210';
    let temp = '';
    for(var i=0;i<n;i++){
        temp += str.charAt(Math.floor(Math.random()*str.length))
    }
    return temp
}
//console.log(randomString(10))

// 定义一个函数 求a所有约数之和
function yushuhe(a){
    let sum = 0
    for(let i=0;i<a;i++){
        if(a%i==0){
            sum += i
        }
    }
    return sum;
}

//输入一个3位数，求这个数的和
function sumNumber(num){
    let bai,shi,ge,sum
    bai = parseInt(num/100)
    shi = parseInt(num/10)%100
    ge = num%10
    sum = bai + ge + shi;
    return  sum;
}

// 已知有字符串 foo=”get-element-by-id”,写一个 function 将其转化成 驼峰表示法”getElementById”
function changeFirstCharUpper(str){
    var arrFoo = str.split('-')
    for(var i=1;i<arrFoo.length;i++){
        arrFoo[i] = arrFoo[i].charAt(0).toUpperCase()+arrFoo[i].substr(1,arrFoo[i].length-1)
    }
    return arrFoo.join('')
}

var foo = "get-element-by-id"
console.log(changeFirstCharUpper(foo))

function serializeUrl(url){
    if(url.indexOf('?')==-1){
        return;
    }
    var urlObject = {};
    var urlString = url.substring(url.indexOf('?')+1)
    var urlArr = urlString.split('&')
    for(var i=0;i<urlArr.length;i++){
        var urlItem = urlArr[i]; 
        var item = urlItem.split("="); 
        urlObject[item[0]] = item[1];
    }
    return urlObject
}
// var url = 'http://item.taobao.com/item.htm?a=1&b=2&c=&d=xxx&e';
// console.log(serializeUrl(url))

//数字转换成千分位 如：12,876,977.98
function numFormat(number){
    let numArr = number.toString().split('.') //分隔小数点
    let arr = numArr[0].split('').reverse()
    let res =[];
    for(var i=0;i<arr.length;i++){
        if(i%3===0 && i!=0){
            res.push(',')
        }
        res.push(arr[i])
    }
    res = res.reverse()
    if(numArr[1]){
        res = res.join('').concat('.'+numArr[1])
    }else{
        res = res.join('')
    }
    return  res
}

let b= 12876977.98
console.log(b.toLocaleString())
console.log(numFormat(b))



