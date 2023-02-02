let data = [
    { id: 0, parentId: null, name: '生物' },
    { id: 1, parentId: 0, name: '动物' },
    { id: 2, parentId: 0, name: '植物' },
    { id: 3, parentId: 0, name: '微生物' },
    { id: 4, parentId: 1, name: '哺乳动物' },
    { id: 5, parentId: 1, name: '卵生动物' },
    { id: 6, parentId: 2, name: '种子植物' },
    { id: 7, parentId: 2, name: '蕨类植物' },
    { id: 8, parentId: 4, name: '大象' },
    { id: 9, parentId: 4, name: '海豚' },
    { id: 10, parentId: 4, name: '猩猩' },
    { id: 11, parentId: 5, name: '蟒蛇' },
    { id: 12, parentId: 5, name: '麻雀' }
]
/**
 * arr 转 tree
 * @param {*} data 数组
 * @returns 
 */
function transTree(data){
    let map = {}   // {0:{id: 0, parentId: null, name: '生物',children:[]},1:{id: 1, parentId: 0, name: '动物',children:[]}...}
    let treeList = []
    if (!Array.isArray(data)) {//验证data是不是数组类型
        return []
    }
    data.forEach(item=>{
        if(!item.children){
            item.children = []
        }
        map[item.id] = item
    })

    data.forEach(item=>{
        if(map[item.parentId]){
            map[item.parentId].children.push(item)
        }else{
            treeList.push(item)
        }
    })
    return treeList;
}
console.log(transTree(data))
