let node = {
    "id": 0,
    "parentId": null,
    "name": "生物",
    "children": [{
        "id": 1,
        "parentId": 0,
        "name": "动物",
        "children": [{
            "id": 4,
            "parentId": 1,
            "name": "哺乳动物",
            "children": [{
                "id": 8,
                "parentId": 4,
                "name": "大象"
            }, {
                "id": 9,
                "parentId": 4,
                "name": "海豚"
            }, {
                "id": 10,
                "parentId": 4,
                "name": "猩猩"
            }]
        }, {
            "id": 5,
            "parentId": 1,
            "name": "卵生动物",
            "children": [{
                "id": 11,
                "parentId": 5,
                "name": "蟒蛇"
            }, {
                "id": 12,
                "parentId": 5,
                "name": "麻雀"
            }]
        }]
    }, {
        "id": 2,
        "parentId": 0,
        "name": "植物",
        "children": [{
            "id": 6,
            "parentId": 2,
            "name": "种子植物"
        }, {
            "id": 7,
            "parentId": 2,
            "name": "蕨类植物"
        }]
    }, {
        "id": 3,
        "parentId": 0,
        "name": "微生物"
    }]
}

function treesArr(node){
    let queue = [node]
    let data = [] //返回的数据结构
    while(queue.length !== 0){
        let item = queue.shift()
        data.push({
            id:item.id,
            parentId:item.parentId,
            name:item.name
        })
        let children = item.children
        if(children){
            for(let i=0; i<children.length; i++){
                queue.push(children[i]) // 将子节点加入队列尾部
            }
        }
    }
    return data;
}
console.log(treesArr(node))
