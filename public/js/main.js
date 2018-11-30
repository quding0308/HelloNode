
function bodyOnload() {
    console.log("body onload");
}

function htmlOnload() {
    console.log("html onload");
}

function loadXMLDoc() {
    /* 
    XHR 是Ajax的基础。所有浏览器都支持XHR对象  
    */

    var request = new XMLHttpRequest()
    request.open("GET", "http://127.0.0.1:3000/", true)

    request.onreadystatechange = function() {
        
        /*
        readyState:
        0: 请求未初始化
        1: 服务器连接已建立
        2: 请求已接收
        3: 请求处理中
        4: 请求已完成，且响应已就绪
        */
        console.log("readyState:" + request.readyState)
        console.log("status:" + request.status)

        // request.response
        // request.responseURL
        // request.responseType
        // request.responseText
        // request.responseXML
        document.getElementById("myDiv").innerHTML=request.responseText;

    }
    request.send()
}

function loadXMLDocPost() {
    /* 
    XHR 是Ajax的基础。所有浏览器都支持XHR对象  
    */

    var request = new XMLHttpRequest()
    request.open("POST", "http://127.0.0.1:3000/", true)

    request.onreadystatechange = function() {
        
        // request.response
        // request.responseURL
        // request.responseType
        // request.responseText
        // request.responseXML
        document.getElementById("myDiv").innerHTML=request.responseText;

    }

    // request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    // request.send("name=123中文")
    request.setRequestHeader("Content-Type", "application/json")
    request.send("{\"你好\":\"nihao\"}")
}