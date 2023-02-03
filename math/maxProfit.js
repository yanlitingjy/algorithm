function maxProfit( prices ) {
    // write code here
    let sell1 = 0, sell2 = 0,
        buy1 = -Infinity, buy2 = -Infinity;
    for(let i of prices){
//         之前买入价格 和 当天买入价格
//         价格越高，收益越低，所以用负号
        buy1 = Math.max(buy1, -i);
//         之前最大卖出价格，和在当天卖出的价格进行对比
        sell1 = Math.max(sell1, buy1 + i);
        buy2 = Math.max(buy2, sell1 - i);
        sell2 = Math.max(sell2, buy2 + i);        
    }
    return sell2
}