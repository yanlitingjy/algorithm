/**
 * 遍历dom tree
 * @param {*} node 
 */
function visitNode(node){
    if(node instanceof Comment) {
        // 注释
        console.info('comment node ---',n.textContent)
    }
    if(node instanceof Text) {
        // 文本
        let t = n.textContent.trim()
        if(t){
            console.info('Text node ---',t)
        }
       
    }
    if(node instanceof HTMLElement) {
        // 注释
        console.info('Element node ---',n.tagName.toLowerCase())
    }
}
/**
 * 深度优先遍历 递归
 * @param {} curNode 
 */
function depthFirstTraverse(curNode){
    visitNode(curNode)
    const childNodes = curNode.childNodes
    if(childNodes.length){
        childNodes.forEach(child=>{
            depthFirstTraverse(child)
        })
    }
}
/**
 * 深度优先遍历 栈
 * @param {} curNode 
 */
 function depthFirstTraverse2(root){
    let stack = []
    // 跟节点压栈
    stack.push(root)
    while(stack.length>0){
        const curNode = stack.pop()
        if(curNode === null) break;
        visitNode(curNode)
        // 子节点压栈
        const childNodes = curNode.childNodes
        if(childNodes.length > 0) {
            // reserve 反顺序压栈
            Array.from(childNodes).reverse().forEach(child => stack.push(child))
        }
    }
}
/**
 * 广度优先遍历 队列
 * @param {} root 
 */
function breadthFirstTraverse(root){
    const queue = []
    // 根节点入队列
    queue.unshift(root)
    while (queue.length>0){
        const curNode = queue.pop()
        if(curNode == null) break;
        visitNode(curNode)
        // 子节点入队
        const childNodes = curNode.childNodes
        if(childNodes.length){
            childNodes.forEach(child=>queue.unshift(child))
        }
    }
}