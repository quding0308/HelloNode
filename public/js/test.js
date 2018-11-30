
// 'use strict'
/**
	* 完成课时
	* @example finishLesson(1);
	* @param {Number} lesson 课程
*/
function finishLesson() {

	/* localStorage是window的一个属性，k v 都是字符串，存储在本地，没有过期时间 */
	// localStorage = window.localStorage;
	// localStorage.setItem('name', 'cat');
	// name = localStorage.getItem('name')
	// length = localStorage.length	
	// key = localStorage.key(0)
	// localStorage.clear()

	/* sessionStorage是window的一个属性，API跟localStorage一致，但生命周期跟当前页面一致，关闭页面会clear 新建tab相当于一个新页面 */

	// window.close();

	let win = window; 
	let dom = win.document

	let win2 = dom.defaultView;

	let head = dom.head;
	let body = dom.body;

	let title = head.getAttribute("title");

	win.nihao = "123"

	console.log("finishLesson end");
	// alert("恭喜，你已经完成HBuilder入门课程。你可以用其它开发工具试试写这几十行代码，至少比HBuilder慢5倍！更重要的是，你很难找到这么爽的编码体验。");

	let btn ;
	btn.on('click', () => {
		//
	});
}

function log(msg) {
	console.log(msg);
}

/**
 * 变量定义
 * closure声明
 * 块级作用域 es6增加了
 * 泛型支持？
 * 高阶函数使用？
 * 
 * 
 * 
 */

{
	var a = 1;	// let 声明的变量，只在代码块内有效;必须在声明后才可以使用
	let b = 2;	// var 声明的变量全局可用;声明之前也可以使用"变量提升
	const c = 3; // 常量 只读	
	// 保证的是：变量指向的地址不可改 对于简单类型的数据（数值、字符串、布尔值），
	// 值就保存在变量指向的那个内存地址，因此等同于常量。
	// 但对于复合类型的数据（主要是对象和数组），变量指向的内存地址，保存的只是一个指针，const只能保证这个指针是固定的，至于它指向的数据结构是不是可变的，就完全不能控制了。

	for (let i = 0; i < 10; i++) {
		console.log("count" + i);
	}
}

console.log("a " + a);
// console.log("b " + b);
// console.log("c " + c);

/*
 function  声明一个函数变量
 ES6中有6种声明变量的方式：var、let、const、function、import、class
*/

/**
 * 函数的使用
 * 
 * 
 */

 // 可以指定默认值
function log(x, y = 'hello') {
	//
}

function Point(x = 0, y = 0) {
	this.x = x;
	this.y = y;
}

// var f = log;
var f = function () {
	console.log("function");
};

console.log(f.name);


/**
 * 箭头函数 =>
 * 使用 => 来定义函数
 */
var f1 = v => v * 2;
var f2 = () => "name";
var f3 = v => {  
	v += 1; 
	return v * 2;
 }
var f4 = (v1, v2) => {
	return v1 + v2;
}
var f5 = (v1, v2) => ({v1, v2});	// return 一个对象
console.log(f5(1, 2));

console.log( [1, 2, 3].map( x => x * x + "str" ) );
console.log( [1, 2, 3].filter( x => x > 2 ) );
console.log( [1, 2, 3].sort( (a, b) => a > b ) );

function Timer() {
	this.s1 = 0;

	// setInterval( function () {
	// 	this.s1 += 1;
	// }, 1000);
	
	setInterval( () => this.s1 += 1, 1000);	// this指向Timer => 中，不可使用arguments, super, new.target
}

let timer = new Timer();

setTimeout(() => console.log(timer.s1), 3100);

// 尾调用优化 是函数编程中的一个概念。

// 尾递归优化

function Fibonacci (n) {
	if (n <= 1) { 
		return 1; 
	} else {
		return Fibonacci(n - 1) + Fibonacci(n - 2);
	}
}
console.log("F" + Fibonacci(10));


/**
 * class 的定义
 * 
 */
// class Point1 {
// 	constructor(x, y) {
// 		this.x = x;
// 		this.y = y;
// 	}

// 	toString() {
	// return '(' + this.x + ', ' + this.y + ')';
// 	}
// }

// 等价于上面的定义
function Point1(x, y) {
	this.x = x;
	this.y = y;
}
Point1.prototype.toString = function () {
	return '(' + this.x + ', ' + this.y + ')';
}

let point1 = new Point1(2, 3);
console.log(point1.toString());


console.log(typeof Point1);
console.log(Point1 === Point1.prototype.constructor);