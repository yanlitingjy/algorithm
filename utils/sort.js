//快速排序
function quickSort(arr){
    if(arr.length<=1)return arr;
    let middleIndex = Math.floor(arr.length/2)
    let middle = arr.splice(middleIndex,1)[0]
    let left = [],right = []
    for(var i=0;i<arr.length;i++){
        if(arr[i]>middle){
            right.push(arr[i])
        }else{
            left.push(arr[i])
        }
    }
    return quickSort(left).concat([middle],quickSort(right));
}
console.log(quickSort([2,3,1,4,6,5,9,8,7]))

//冒泡排序
function maopao(arr){
    if(arr==null || arr.length < 2 ){
        return;
    }
    for(var i=0;i<arr.length-1;i++){
        for(var j=0;j<arr.length-i-1;j++){
            if(arr[j]>arr[j+1]){
                var temp = arr[j]
                arr[j] = arr[j+1]
                arr[j+1] = temp
            }
        }
    }
    return arr
}
var arr = [89,63,78,12,458,24,76,3,49]
console.log(maopao(arr))
