//Ajax的原理通过XmlHttpRequest对象来向服务器发异步请求，从服务器获得数据，然后用JavaScript来操作DOM而更新页面

// 1、创建 Ajax的核心对象 XMLHttpRequest对象

// 2、通过 XMLHttpRequest 对象的 open() 方法与服务端建立连接

// 3、构建请求所需的数据内容，并通过XMLHttpRequest 对象的 send() 方法发送给服务器端

// 4、通过 XMLHttpRequest 对象提供的 onreadystatechange 事件监听服务器端口的通信状态

// 5、接收并处理服务端向客户端响应的数据结果

// 6、将处理结果更新到 HTML页面中

function myAjax(options){
    //1、创建XMLHttpRequest对象
    let xhr
    if(window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    } 

    //初始化参数的内容
    options = options || {}
    options.type = (options.type || 'GET').toUpperCase()
    options.dataType = options.dataType || 'json'
    const params = options.data

    //发送请求
    if (options.type === 'GET') {
        xhr.open('GET', options.url + '?' + params)
        xhr.send(null)
    } else if (options.type === 'POST') {
        xhr.open('POST', options.url)
        xhr.send(params)
    }
    //接收请求
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            let status = xhr.status
            if (status >= 200 && status < 300) {
                options.success && options.success(xhr.responseText, xhr.responseXML)
            } else {
                options.fail && options.fail(status)
            }
        }
    }
}

myAjax({
    type: 'post',
    dataType: 'json',
    data: {},
    url: 'https://xxxx',
    success: function(text,xml){//请求成功后的回调函数
        console.log(text)
    },
    fail: function(status){////请求失败后的回调函数
        console.log(status)
    }
})