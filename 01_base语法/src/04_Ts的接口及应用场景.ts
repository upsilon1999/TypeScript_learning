/**
 * 语法：
 * interface 接口名 {
 *      属性值:类型
 *      属性值:类型
 *      方法名:返回值类型
 * }
 * 
 * 接口只做定义不做实现
 */
interface Product {
    price:number
    sell():void
}

/**
 * 实现接口要做到，一个不少，一个不多
 * 完全按照接口的定义
 */
let p:Product = {
    price:20,
    sell() {
        console.log("卖了多少钱");
    }
}

//#region 接口的优点1：可以继承
/**
 * 继承的好处：
 * 可以节省代码，提高程序的整洁度
 * 与type相比，可继承的特点使得接口扩展性更好
 * 
 * 语法:
 * 
 * interface 子接口 extends 父接口{
 *      //相当于全盘复制父接口并作扩展
 * }
 */
interface Animal{
    name:string
    say():void
}

interface Dog extends Animal{
    wang():void
}
//#endregion

//#region 为参数传递进行限定
// 规范传参
interface Book {
    name:string
    price:number
}

function sellBook(b:Book){
    console.log(b.name);
}

let book1:Book = {
    name:"野性的呼唤",
    price:20
}

sellBook(book1)
//#endregion


//#region 可以用类实现接口
//类的知识之后说，这里只是场景
//为多个同类别的类提供统一的方法和属性声明
/**
 * 语法：
 * class 类名 implements 接口名{
 * 
 * }
 * 
 * 用类实现接口，通过编译器的提示
 * 快速修复 --> 实现接口 -->可以快速书写类的接口
 * 
 * 提高开发效率和规范类的结构，
 * 规范类的结构，接口就和类的目录一样，不可随意修改，使得维护起来方便
 */
interface List {
    add():void
    remove():void
}

//以下为快速生成
class ArrayList implements List {
    add(): void {
        throw new Error("Method not implemented.");
    }
    remove(): void {
        throw new Error("Method not implemented.");
    }
  
}

//以下为快速生成
class LinkedList implements List {
    add(): void {
        throw new Error("Method not implemented.");
    }
    remove(): void {
        throw new Error("Method not implemented.");
    }
}
  
//#endregion

//#region 可索引签名
/**
 * 情况：
 * 有些接口的属性名不确定，个数也不确定
 * 
 * 格式：
 * [未知的代号:类型A]:类型B
 * 
 * 属性的部分 [未知的代号:类型A]
 * 通常使用 [x:string]
 * x表示未知的代号，实际上啥都行，就是设个未知数
 * string表示类型，但是值得注意：
 * ①虽然写的是string，但是属性名可以写任意类型，number、symbol、boolean都正确
 * ② 如果是其他类型，则属性名必须是相应类型，例如设为[x:number],则属性名必须是number类型
 * ③所以都设置为[x:string]方便拓展
 * 
 * 
 * 属性值的部分：
 * 类型B 必须兼容之前存在的所有类型，
 * 例如 下面的Fish接口，则至少要设置为
 * [x:string]: string|number
 * 
 * 
 * 可索引签名表示扩展的内容必须遵循这个格式
 */
interface Fish {
    name:string
    sex:string
    age:number
    // 可索引签名
    [x:string]:any
}
//#endregion

export {}