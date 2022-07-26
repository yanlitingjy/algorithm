//es6方法过滤掉两个数组中对象id值相等的项
function filterSameId(arr1,arr2){
    arr1.filter(item=> !arr2.some(ele =>ele.id == item.id))
}

//数组去重
function unique(arr) {
    let newArr = []
    arr.forEach(val=>{
        if(newArr.indexOf(val) === -1){
            newArr.push(val)
        }
    })
    return newArr;
}

// 写出代码对下列数组去重并从大到小排列{5,2,3,6,8,6,5,4,7,1,9}
function fn(arr){
    let newArr = []
    arr.forEach(val=>{
        if(newArr.indexOf(val) === -1){
            newArr.push(val)
        }
    })
    return newArr.sort((a,b)=>{
        if(a>b){
            return 1
        }else {
            return -1;
        }
    }).join(',')
}
var arr = [5,2,3,6,8,26,15,6,5,4,7,1,9]
console.log(fn(arr))
