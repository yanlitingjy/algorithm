// 给定一个整数数组，其中第 i 个元素代表了第 i天的股票价格；
// 非负整数 fee 代表了交易股票的手续费用，求返回获得利润的最大值

// 例如数组为：[1, 12, 13, 9, 15, 8, 6, 16]，fee为2，求获得利润的最大值
/**
 * 贪心算法求解交易明细
 * @param {array} list - 股票每天的价格列表
 * @param {number} fee - 手续费
 * */

//  思路
//  1） 增加result对象，把每笔赚钱的交易都记录下来
//  2） 新增minIndex属性，用来记录每次买入值（最小值）的变化
//  3） 当minIndex不变时，用新的记录替换掉老的记录
//  4） 遍历result对象，取出所存储的交易明细
function buyStock(list, fee) {
    // 增加result对象，把每笔赚钱的交易都记录下来
    let result = {};
    // min为当前的最小值，即买入点
    let min = list[0],
        // 增加minIndex 用来记录每次买入值（最小值）的变化
        minIndex = 0,
        sum = 0;
    for (let i = 1; i < list.length; i++) {
        if (list[i] < min) {
            minIndex = i;
            // 寻找数组的最小值
            min = list[i];
        } else {
            let temp = list[i] - min - fee;
            // 计算如果当天卖出是否赚钱
            if (temp > 0) {
                sum += temp;
                // 关键代码：重新计算min，分两种情况，如果后面继续涨，则默认继续持有；若后面跌，则以后面的价格重新买入
                min = list[i] - fee;
                // 赚钱 存数据
                // 当minIndex不变时，用新的记录替换调老的记录
                result[minIndex] = [list[minIndex], list[i]];
            }
        }
    }
    let arr = [];
    console.log(result)
    // 遍历result对象，取出所存储的交易明细
    Object.keys(result).forEach(key => {
        arr.push(result[key]);
    });
    return {
        sum,
        arr
    };
}

console.log(buyStock([1, 12, 13, 9, 15, 8, 6, 16], 2));
// 打印结果： {sum: 22, arr: [[1, 13], [9, 15], [6, 16]]}

// 3次交易明细
// 1买入，13卖出；
// 9买入，15卖出；
// 6买入，16卖出

// 22 = (13 - 1 - 2) + (15 - 9 -2) + (16 - 6 - 2)