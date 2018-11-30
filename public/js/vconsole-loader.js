var script = document.createElement("script");
script.type = "text/javascript";
script.src = "https://cdn.bootcss.com/vConsole/3.2.0/vconsole.min.js";
script.onload = function() {
    var vConsole = new VConsole();
    console.log('Hello world');
}
document.body.appendChild(script);

