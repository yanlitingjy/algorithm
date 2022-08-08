// js 给出一个有n个元素的数组S，S中是否有元素a,b,c满足a+b+c=0？找出数组S中所有满足条件的三元组
// 注意： 三元组（a、b、c）中的元素必须按非降序排列。（即a≤b≤c） 解集中不能包含重复的三元组。 
// 例如，给定的数组 S = {-10 010 20 -10 -40},解集为(-10, -10, 20),(-10, 0, 10)

// 示例1
// 输入：[0]
// 返回值：[]

// 示例2
// 输入： [-2,0,1,1,2]
// 返回值： [[-2,0,2],[-2,1,1]]

// 示例3
// 输入： [-10,0,10,20,-10,-40]
// 返回值： [[-10,-10,20],[-10,0,10]]

/**
 * 解题步骤
 * 1、将数组从小到大排序
 * 2、循环数组，判断前两个数子加起来的结果，在数组中是否存在
 * 3、存在的话，将这3个数存到数组中
 */
/**
 * 
 * @param {*} num  整形一维数组
 * @returns 整形二维维数组
 */
function threeSum( num ) {
    let ans = new Set()
    let newNum = num.sort((a,b)=>{
        return a - b
    })
    for(let i=0;i<newNum.length;i++){
        let target = -newNum[i]
        for(let j=i+1;j<newNum.length;j++){
            // indexOf 的第一个参数，表示需要查找的元素，第二次参数表示从索引的那个的位置开始往后查找
            if(newNum.indexOf(target-newNum[j],j+1)!==-1){  
                let index=num.indexOf(target-num[j])
                let temp=[]
                temp.push(num[i])
                temp.push(num[j])
                temp.push(num[index])
                ans.add(temp)
                while(num[j]==num[j+1]) j++  //去重
            }
        }
        while(num[i]==num[i+1]) i++ //去重
    }
    return Array.from(ans) 
}
let arr = [-10,0,10,20,-10,-40]
console.log(threeSum(arr))
/**
 * 解题步骤
 * 1、将数组从小到大排序
 * 2、创建一个空数组，循环这个数组，如果当前数子和前一个数子相同的话，跳过，
 * 3、比较三个数字和是否为0
 * 4、存在的话，将这3个数存到数组中
 */
function threeSum2( num ) {
    let ans = new Set()
    let newNum = num.sort((a,b)=>{
        return a - b
    })
    for(let i=0;i<newNum.length;i++){
         // 数组newNum已经是排过序的，由小到大的顺序。该位置数字如果大于0的话，那么后面的数一定都大于0
         if(num[i]>0){
            break;
        }
        // 去掉重复的
        if(i!=0 && newNum[i] == newNum[i-1]){
            continue;
        }
        for(let j=i+1;j<newNum.length;j++){
            if(j!=i+1 && newNum[j] == newNum[j-1]){
                continue;
            }
            for(let k=j+1;k<newNum.length;k++){
                if(k!=j+1 && newNum[k] == newNum[k-1]){
                    continue;
                }
                let sum = newNum[i]+newNum[j]+newNum[k];
                if(sum == 0){
                    let list = []
                    list.push(num[i]);
                    list.push(num[j]);
                    list.push(num[k]);
                    ans.add(list);
                }
            }
        }
    }
    return Array.from(ans) 
}
let arr1 = [-10,0,10,20,-10,-40]
console.log(threeSum2(arr1))
