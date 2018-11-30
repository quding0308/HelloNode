'use strict'

import {Kitty, hello} from "./module1.js" 

// 从 es6 引入了新的关键字 来实现 class，本质还是基于原型  
/*
class 
constructor
static
extends
super
interface
*/

console.log("strict a");

class Polygon {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
}

class Square extends Polygon {

    constructor(sideLength) {
        super(sideLength, sideLength);
    }

    get area() {
        return  this.width * this.height;
    }

    set sideLength(newSideLength) {
        this.height = newSideLength;
        this.width = newSideLength;
    }
}

// 原型链  square --> Polygon --> Object.prototype --> Object.prototype --> null
var square = new Square(2);


console.log("1");

let obj = new Kitty();
obj.hello1();

hello();
