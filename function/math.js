console.log(null === null) // true
console.log(undefined === undefined) // true
console.log(NaN === NaN) // false

console.log( 88 + NaN); // NaN
console.log( Infinity + Infinity); // Infinity
console.log( -Infinity + -Infinity); // -Infinity
console.log( Infinity + -Infinity); // NaN

console.log('***************');
console.log( +0 + +0);// +0
console.log( +0 + -0); // +0
console.log( -0 + -0); // -0
console.log('*************** 字符串+ 数值');
console.log( "10" + 10.10); // 1010.1
console.log( "1" + 2+3+4); // 1234
console.log( 1+2+3 + '1');// 61
console.log( 1 + (1+'2') + 3);// 1123

console.log('*************** 字符串+?');
console.log( "1" + NaN); // 1NaN
console.log( "1" + Infinity); // 1Infinity
console.log( "1" + -Infinity); // 1-Infinity
console.log( "1" + true); // 1true
console.log( "1" + false); // 1false
console.log( "1" + undefined);// 1undefined
console.log( "1" + null); // 1null
console.log('*************** 字符串+[]');
console.log( '1' + []); // 1
console.log( '1' + [1,2.3]); // 11,2.3
console.log( '1' + [,,,]); // 1,,
console.log( '1' + [123,456,678,'aaa']); // 1123,456,678,aaa

console.log('***********数值 + boolean');
console.log( 11 + true); // 12
console.log( 11 + false);// 11
console.log('***********数值 + 数组');
console.log( 1 + []); // 1
console.log( 1 + [1,2,3]); // 11,2,3
console.log( 1 + [123,456,778]); // 1123,456,778
console.log( 1 + [,2,,,]); // 1,2,,

console.log('***********数组+ 其他');
console.log( [12,12] + function (){var a = 0}); // 12,12function (){var a = 0}
console.log( [] + function (){var a = 0}); // function (){var a = 0}
console.log( [12,12] + {}); // 12,12[object Object]
console.log( [12,12] + {a : 1}); // 12,12[object Object]

console.log('*********数组 函数  对象');
console.log( [1] + [2]); // 12
console.log( [] +[1,2,3]);// 1,2,3
console.log( ({}) + ({}));  // [object Object][object Object]
console.log( ({}) + ({a:1})); // [object Object][object Object] 
console.log( function (){var a = 0} + function (){var a = 0}); // function (){var a = 0}function (){var a = 0}
console.log( {} + []); // [object Object]
console.log( [] + {});// [object Object]
console.log( function (){var a = 0} + {}); // function (){var a = 0}[object Object]
console.log( [1,2] + function (){var a = 0});// 1,2function (){var a = 0}