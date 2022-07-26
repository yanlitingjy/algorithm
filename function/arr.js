// 打乱数组内元素的顺序
let array = [0,1,2,3,4,5]
for (let index = 0; index < array.length; index++) {
    let random = Math.floor(Math.random() * index)
    let temp = array[index]
    array[index] = array[random]
    array[random] = temp
}
console.log(array);

// 二分法寻找数组元素
function search(target) {
    let start = 0;
    let end = array.length - 1;
    while (start <= end) {
        middle = Math.floor((end + start) / 2);
        if (target === array[middle]) {
            return middle;
        } else if (target > array[middle]) {
            start = middle + 1;
        } else {
            end = middle - 1;
        }
    }
    return -1;
}

// 九九乘法表
for (let i = 1; i <= 9; i++) {
    for (let j = 1; j <= i; j++) {
        document.write(j + " * " + i + "=" + j * i + ",  ");
    }
    document.write("</br>");
}