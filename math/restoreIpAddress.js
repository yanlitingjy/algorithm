// 数字字符串转化成IP地址

// 现在有一个只包含数字的字符串，将该字符串转化成IP地址的形式，返回所有可能的情况。
// 例如：给出的字符串为"25525522135",
// 返回["255.255.22.135", "255.255.221.35"]. (顺序没有关系)

// 数据范围：字符串长度 在0-12之间 
// 要求：空间复杂度 O(n!)O(n!),时间复杂度 O(n!)O(n!)

// 注意：ip地址是由四段数字组成的数字序列，格式如 "x.x.x.x"，其中 x 的范围应当是 [0,255]。

//示例
// 输入: "25525522135"    输出: ["255.255.22.135","255.255.221.35"]
// 输入："1111"   输出：["1.1.1.1"]
// 输入："000256"  输出： []

// 思路：
// 对于IP字符串，如果只有数字，则相当于需要我们将IP地址的三个点插入字符串中，
// 而第一个点的位置只能在第一个字符、第二个字符、第三个字符之后，
// 而第二个点只能在第一个点后1-3个位置之内，第三个点只能在第二个点后1-3个位置之内，
// 且要要求第三个点后的数字数量不能超过3，因为IP地址每位最多3位数字。

// 具体做法：

// step 1：依次枚举这三个点的位置。
// step 2：然后截取出四段数字。
// step 3：比较截取出来的数字，不能大于255，且除了0以外不能有前导0，然后才能组装成IP地址加入答案中。

function restoreIpAddress(str){
    let res = []
    let length = str.length;
    //遍历IP的点可能的位置（第一个点）
    for(let i=1;i<4 && i<length-2;i++) {
        //第二个点的位置
        for(let j=i+1;j<i+4 && j<length-1;j++){
            //第三个点的位置
            for(let k=j+1;k<j+4 && k<length;k++){
                //最后一段剩余数字不能超过3
                if(length - k >= 4) continue;
                //从点的位置分段截取
                let a = str.substring(0,i)
                let b = str.substring(i,j)
                let c = str.substring(j,k)
                let d = str.substring(k)
                //IP每个数字不大于255
                if(a>255 || b>255 || c>255 || d>255) continue;
                //排除前导0的情况
                if((a.length != 1 && a.charAt(0) == '0') || (b.length != 1 && b.charAt(0) == '0') ||  (c.length != 1 && c.charAt(0) == '0') || (d.length != 1 && d.charAt(0) == '0')) continue;
                //组装IP地址
                let temp = a + "." + b + "." + c + "." + d   
                res.push(temp)
            }
        }
    }
    return res;
}

let str = '000256'
console.log(restoreIpAddress(str))
