// 在一条环路上有 n 个加油站，其中第 i 个加油站有汽油 gas[i] 升。

// 你有一辆油箱容量无限的的汽车，从第 i 个加油站开往第 i+1 个加油站需要消耗汽油 cost[i] 升。你从其中的一个加油站出发，开始时油箱为空。

// 给定两个整数数组 gas 和 cost ，如果你可以绕环路行驶一周，则返回出发时加油站的编号，否则返回 -1 。如果存在解，则 保证 它是 唯一 的。

// 示例一
// 输入: gas = [1,2,3,4,5], cost = [3,4,5,1,2]
// 输出: 3
// 解释:
// 从 3 号加油站(索引为 3 处)出发，可获得 4 升汽油。此时油箱有 = 0 + 4 = 4 升汽油
// 开往 4 号加油站，此时油箱有 4 - 1 + 5 = 8 升汽油
// 开往 0 号加油站，此时油箱有 8 - 2 + 1 = 7 升汽油
// 开往 1 号加油站，此时油箱有 7 - 3 + 2 = 6 升汽油
// 开往 2 号加油站，此时油箱有 6 - 4 + 3 = 5 升汽油
// 开往 3 号加油站，你需要消耗 5 升汽油，正好足够你返回到 3 号加油站。
// 因此，3 可为起始索引。

// 分析问题，可以得出两个结论:
// (1) 如果存在答案，则每个节点都需要经过1次，然后绕回起点
// (2) 如果存在答案, 则所有节点处的gas之和, 大于所有路程中的cost
// 先随机假设一个起点, 假设start = n - 1,则判断它是否能到达下一步 end = 0, 只需要判断left_gas = gas[start] - cost[start] >= 0是否成立,
// 如果成立, 就计算一下剩余gas量left_gas += gas[end] - cost[end], 然后把终点再向后移动一位end += 1
// 如果不成立, 说明起点gas不够, 就采取以退为进的办法, start -= 1, left_gas += gas[start] - cost[start]
// 按照这个步骤，如果start和end又在中间相遇， 此时判断left_gas>=0是否成立，如果成立，说明start就是那个闪亮的起点; 否则说明环形不可达, 返回-1

/**
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
 var canCompleteCircuit = function(gas, cost) {
    let start = gas.length -1 
    let end = 0
    let sum = gas[start] - cost[start]
    while(start > end ){
        if(sum >= 0) {
            sum += gas[end] - cost[end]
            ++ end
        }else {
            -- start
            sum += gas[start] - cost[start]  
        }
    }
    return sum>=0 ? start : -1
};