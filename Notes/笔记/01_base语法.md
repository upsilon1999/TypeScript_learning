
## 基础概念和环境搭建

### 定义

融合了面向对象思想的javaScript超集。

### 环境搭建

```sh
#包环境
npm init -y
# 安装typescript
npm install typescript -D
# 生成typescript配置文件
tsc --init
```

#### 无法识别tsc

![[Snipaste_2023-10-12_23-02-42.png]]

>出现问题的原因

```sh
这个问题的原因是： 
由于typescript 是局部安装的，所以在控制台或者终端肯定是无法使用的，控制台或者终端能使用的是我们电脑本地安装的命令或者是环境变量里面有的配置，例如:npm npx 等
```

>解决方案

* 全局安装typescript

  ```sh
  npm install typescript -g
  
  #优点
  使用方便
  
  #缺点
  可能会污染全局的变量，不会实时更新typescript 这个库， 毕竟安装好了一般都是不管的。
  ```

* 使用node提供的npx

  ```sh
  npx tsc --init
  
  # 缺点
  运行tsc需要借助npx指令，需要预装node
  
  # 优点
  环境干净
  ```

## 类型注解与类型推导

```ts
//类型注解
/**
 * 当我们在变量声明时就指明了类型，形如
 * 
 * let 变量名:变量类型
 * 
 * 就称之为类型注解，在赋值的时候就得遵循指明的类型
 */
let age:number =  18


//类型推导
/**
 * 我们声明变量时没有指定类型，但是赋了值，形如
 * 
 * let 变量名 = 变量值
 * 
 * 变量将根据变量值推导出类型
 */
let city = "罗马"

/**
 * 类型注解与类型推导的区别
 * ①类型注解时有默认值的
 * ②类型注解在变量定义时就进行了类型校验，而类型推导可以给任意值
 */
```

## Ts编译与编译优化
### Ts编译问题

>局部文件设置

```ts
// 由于ts文件默认全局检测，所以不能用之前在别的文件中声明过的
let age:number = 18
//可以设置局部文件，加上下面一行即可
export {}
```

>编译问题

1.node不识别

```sh
node xxx.ts
#不被node识别
```

2.浏览器不认识ts语法
![[浏览器不认识.png]]

>无法识别的解决方案

ts代码要正常运行，就得转换编译成正常的js代码。
使用`tsc`命令，把ts文件转换成可执行的js文件，例如
```sh
# 把ts文件转换成js文件
#默认生成在同目录，可以在ts配置文件中调整
tsc my.ts

# 编译js文件即可，例如
node my.js
```
>编译踩坑之完整路径

背景：我的tsc是局部安装的，所以需要以npx前缀启动，结果报以下错误
![[局部tsc采用完整路径.png]]
解决方案：
tsc指令后跟随需要编译文件的完整路径
### 编译配置
>输出目录的配置

在`tsconfig.json`中，找到`outDir`和`rootDir`,默认是注释掉的
```json
{
	"compilerOptions":{
		"rootDir":"./src",
		"outDir":"./dist"
	}
}
```
1.`rootDir`配置的是ts文件的目录，如上的配置将把所有`./src`目录下的ts文件，编译后都输出到我们配置的`outDir`目录下。还有个`rootDirs`目录，值是一个数组，不过我们此次用`rootDir`目录。
2.`outDir`指定编译的js文件的生成目录。
3.`./`代表工程根目录








## 常用的24中Ts类型
>概述

```sh
"基本类型"
number string boolean symbol null undefined

"根类型"
Object  {}

"对象类型"
Array  object function

"枚举"
enum

"其他特殊类型"
any unkonown never void 元组(tuple) 可变元组

"合成类型"
联合类型 交叉类型

"字面量数据类型"
```
### 根类型

```ts
//根类型

/**

 * 根类型包括 Object和{}

 * 根类型可以理解为其他任意数据类型的父类

 * Object类型，除了null和undefied这种空类型外都可以赋值

 * {}和Object一样，他是Object的简写

 */

let b1:Object = [1,2,3,"ddd"]

let b2:number = 3

let b3:{} = "vvv"
```
### 对象类型

```typescript
/*******************对象类型*****************************/

/**

 * 对象类型

 * Array object function

 * 注意object是对象类型，Object是根类型，首字母大小写

 * Array是数组类型，使用需要指明值的类型 Array<类型>

 */

let c1:Array<number> = [1,2,3]

let c2:object = {

    name:"小明",

    age:18

}

/********************************************************/
```
### 枚举类型
#### 枚举出现的背景

解决多次if/switch判断中的语义化的问题
>以前的解决方式常量解决

```typescript
// if/switch的痛点：值和情况太多

/**

 * 下面采用的是常量解决的方式

 * 1.不直接用数字的原因：可读性低，即if/switch语义化不明

 * 2.所以外置常量，增加可读性

 * 3.存在问题，getAduitStatus传入的参数status的number类型设置的太宽泛

 *

 * 常量解决带来的局限性:

 * 方法参数不能定义为具体类型，只能初级使用number,string基本类型替代，降低了代码的可读性和可维护性。

 */

const Status = {

    MANAGER_ADUIT_FAIL:-1,

    NO_ADUIT:0,

    MANAGER_ADUIT_SUCCESS:1,

    FINAL_ADUIT_SUCCESS:2

}

//审核类

class MyAduit {

    getAduitStatus(status:number):void{

        if(status === Status.NO_ADUIT){

            console.log("没有审核");

        }else if(status === Status.MANAGER_ADUIT_SUCCESS){

            console.log("审核通过");

        }else if(status === Status.MANAGER_ADUIT_FAIL){

            console.log("审核失败");

        }

    }

}
```
>常量解决存在的局限性

方法参数不能定义为具体类型，只能初级使用number,string基本类型替代，降低了代码的可读性和可维护性。

#### 枚举的定义
定义：用来存放一组固定的常量的序列
>语法

```typescript
enum 枚举的名字{
	//枚举块，内容是一个个枚举项
	//枚举项的写法
	键 = 值
}
```
枚举的底层就是一个对象，根据枚举类型的不同，映射类型也不同，
例如数字类型的枚举，除了键映射外还有一个值映射，相当于双向映射
>使用

```typescript
枚举的名字.键  => 值
枚举的名字["键"] => 值

//数字类型的枚举，多一个双向映射
枚举的名字[数字值] => 键
```

#### 枚举的分类
>字符串枚举

```typescript
enum WeekEnd {
	Monday = "MyMonday",
	Tuesday = "MyTuesday",
	Wensday = "MyWensday",
	ThirsDay = "MyThirsDay"
}

//键 => 值
//和对象一样，单向映射
console.log(WeekEnd.Monday)
console.log(WeekEnd["Monday"])
```
>数字枚举

```typescript
enum MyNum {
	Monday = 1,
	Tuesday,
	Wensday
}

//数字枚举的值会自动计算，每次加1
//从最近的一个设定了值的那项开始计算，如果都没有就从0开始

//双重映射
//键 => 值
//键 => 值
console.log(MyNum.Monday);

//值 => 键
console.log(MyNum[1]);
```
#### 枚举底层的样子
将ts文件编译成js文件就可以查看
>字符串类型的枚举

```typescript
//ts源文件
enum WeekEnd {
	Monday = "MyMonday",
	Tuesday = "MyTuesday",
	Wensday = "MyWensday",
	ThirsDay = "MyThirsDay"
}
```

```javascript
//编译后的底层
var WeekEnd;

(function (WeekEnd) {

    WeekEnd["Monday"] = "MyMonday";

    WeekEnd["Tuesday"] = "MyTuesday";

    WeekEnd["Wensday"] = "MyWensday";

    WeekEnd["ThirsDay"] = "MyThirsDay";

})(WeekEnd || (WeekEnd = {}));
```

>数字类型的枚举

```typescript
//ts源文件
enum MyNum {
	Monday = 1,
	Tuesday,
	Wensday
}
```

```javascript
//编译后的底层
var MyNum;

(function (MyNum) {

    MyNum[MyNum["Monday"] = 1] = "Monday";

    MyNum[MyNum["Tuesday"] = 2] = "Tuesday";

    MyNum[MyNum["Wensday"] = 3] = "Wensday";

})(MyNum || (MyNum = {}));
```
#### 枚举的好处
 * 1.有默认值和可以自增加值，节省编码时间
 * 2.语义更清晰，可读性更强
 因为枚举类型是一种值类型的数据，方法参数可以明确参数类型为枚举类型
```typescript
// 改造上面的案例

enum StatusEnum {

    // 利用自增的特性

    MANAGER_ADUIT_FAIL =-1,

    NO_ADUIT,

    MANAGER_ADUIT_SUCCESS,

    FINAL_ADUIT_SUCCESS

}

  

function getEnumStatus(status:StatusEnum){

    // 枚举既是类型，又是一个变量

    if(status === StatusEnum.NO_ADUIT){

        console.log("没有审核");

    }else if(status ===StatusEnum.MANAGER_ADUIT_SUCCESS){

        console.log("审核通过");

    }else if(status === StatusEnum.MANAGER_ADUIT_FAIL){

        console.log("审核失败");

    }

}

// 这样我们使用的时候也使用枚举值，而不是数字，可读性就极强
getEnumStatus(StatusEnum.NO_ADUIT)
```

### 合成类型之联合类型

联合类型是`或`的关系，在实际使用时，编译器会根据上下文得出他的实际类型
>格式

```sh
类型1 | 类型2 | ...
```
>小结
```typescript
/*********************联合类型****************************/

// 合成类型之联合类型

/**

 * 用多种数据类型联合起来，例如用时候我们需要一个值是数字或字符串

 * 格式：

 * 类型1 | 类型2 | 类型3

 *

 * 理解：

 * 联合类型是 或 的关系

 * tips:我们给的是联合类型，但是做操作的时候编译器会根据情况给他相应类型

 */

let d1: number|string = 5

d1 = "aaa"

// 例如下面编译器就和得出d1是string类型

console.log("编译器会自动判断成相应类型",d1);

/********************************************************/
```
### 合成类型之交叉类型
交叉类型是`与`的关系，表示值需要同时满足这些类型
>格式

```sh
类型1 & 类型 2 & ...
```
对于无法产生交集的类型的组合，会得到never类型
>小结

```typescript
/******************交叉类型*******************************/

// 合成类型之交叉类型

/**

 * 交叉类型是 与 的关系

 * 格式：

 * 类型1 & 类型2 & 类型3

 *

 * 值需要同时满足多个类型

 */

  

/**

 * 理解

 * {username:string}

 * 值是一个对象类型，里面有一个键 username

 * 并且username的类型是string

 */

let f1:{username:string} = {

    username:"abc"

}

  

/**

 * 定义类型

 * type 类型名A = 类型A

 *

 * 使用：

 * let a:类型名A = 值

 * 就相当于

 * let a:类型A = 值

 */

type A1 = {name:string}

type A2 = {age:number}

  

// 这就是interface的实现逻辑

// 值需要同时满足多个类型

let f2:A1 & A2 ={

    name:"张三",

    age:14

}

  

/**

 * 交叉类型是有限制的，创造不被允许的类型是不允许的，例如

 * string & number

 * 这两个类型没有交集，就会变成never类型

 */

/********************************************************/

```
### 字面量类型
可以理解为镜子类型，就是值需要与类型长得一样
>小结

```typescript
/*********************字面量类型******************************/

/**

 * 所谓字面量类型，就是值 的样子必须和类型一样

 * 可以理解为照镜子

 */

type num = 1 | 2 | 3

let n:num = 3

/**

 * 实际应用举例

 * 我们想要 输入1和0来代表true和false，其他数字不可以

 * 0 代表false ，1代表true是我们用业务来表明的

 */

type increase = 0 | 1

function isStart(increase:increase){

    if(increase == 0){

        console.log("还没开始");

    }else{

        console.log("开始了");

    }

}

// 调用函数，传入值只能是0或1，0代表false，1代表true

isStart(1)

/****************************************************************/
```
### 其他类型之never

使用never避免出现未来扩展新的类没有对应的实现，目的是写出安全的代码
我们目前可以知道，当交叉类型没有交集时，就是never类型.
>面试题：never在什么情况下会被呈现

在逻辑不存在时会出现
>小结

```typescript
/***********************never类型*******************************/

/**

 * 面试题：never类型什么时候会被呈现

 * 补充：

 * 得到值的类型

 * typeof 值  

 */

type Params = string | number

function getParams(p:Params){

    if(typeof p === "string"){

        console.log("这是字符串",p);  

    }else if(typeof p === "number"){

        console.log("这是数字",p);  

    }else{

        // 预留给其他可能存在的类型

        //他会给我们推断出data是never类型

        //和交叉类型一样，因为不可能存在

        let data = p

    }

}

/**************************************************************/
```
### any，unknown的两点区别和应用场景
#### 背景
any和unknown在开发中和第三方包源码底层经常看到，弄清楚他们的区别很重要。
>相同点
```sh
any和unknown可以是任何类的父类，所以任何类型的变量都可以赋值给any类型或者unknown类型的变量
```
>不同点
```sh
1.any也可以是任何类型的子类，但unknown不可以，所以any类型的变量都可以赋值给其他类型的变量。

2.不能拿unknown类型的变量来获取任何属性和方法，但any类型的变量可以获取任意名称的属性和任意名称的方法

3.any代表任意，unknown只代表暂时不明确
```
#### any
典型应用场景有:
1.自定义守卫
2.需要进行`as any`类型断言的场景
>举例
```typescript
/************************any类型************************** */

//#region any类型

//①

//any可以是任何类的父类，所以任何类型的变量都可以赋值给any类型的变量

//null和undefined也可以被any接收

let arr:Array<string> = ["a","b"]

let num:number = 12

let myArr:any = arr

let myNum:any = num

  

//②

//any也可以是任何类型的子类，所以any类型的变量都可以赋值给其他类型的变量。

let str:any = "abc"

let kk:number = str  //这会存在隐患，这就是any的问题

//这里狭义的父子类的概念，右边的类型为子类，左边为父类

  

//③

//any类型的变量可以获取任意名称的属性和任意名称的方法

function getMyname(data:any){

    // 这是可行的，但是unknown不行

    console.log(data.name);

}

  

//any作为子类的应用场景

/**

 * 从后端获取的值，不确定类型，就用any接受

 * let book:any = 后端返回

 * 明确类型后，给对应的值

 * let myBook:book[] = book

 */

  

//any作为父类的应用

/**

 * 1.自定义守卫，我们不确定要传递的类型，先有any占位，未来详述

 */

  

//any还可以用于类型断言

//#endregion

/********************************************************* */
```
#### unknown
一般用作函数参数，用来接收任意类型的变量实参，但在函数内部只用于再次传递或输出结果，不获取属性的场景。
>举例
```typescript
/**************************unknown类型************************** */

//#region unknown类型

//unknown可以是任何类的父类，所以任何类型的变量都可以赋值给unknown类型的变量

//null和undefined也可以被unknown接收

let arr1:Array<string> = ["a","b"]

let num1:number = 12

let myArr1:unknown = arr

let myNum1:unknown = num

  

//不能拿unknown类型的变量来获取任何属性和方法

function getYourName(data:unknown){

    // 报错，提示data类型是不明确的，他不确定能不能点属性

    // console.log(data.name);

  
  

    console.log(data);

}

// 但是可以接受任意类型的值，用它是所有类型父类的特性

getYourName({name:"zs"})

getYourName([1,2])

//#endregion

/************************************************************** */
```

#### 几个案例

>使用的键是个不定值

```typescript
let obj = {username:"zhansan"}
let a = "username" 

/*
    由于a的值是可变的，所以他可能会被改变不等于 username
    ts预先判断到了这种错误，故予以禁止
*/
//let u = obj[a]

// 解决方案
//使用不可变的常量
const b = "username"
let t = obj[b]
```

>避免以下的情况

```typescript
 let obj1:object = {age:18}

/**
 * 以下这个情况也会报错，是索引类型的错误
 * 他会拿着 c代表的age这个键去和类型object对比
 * 发现object没有规定这个索引，故报错
 * 
 * 尽量避免这种
 */
 
//const c = "age"
//let k = obj1[c]
```





### null和undefined

#### 回顾js中的null与undefined

```js
//javascript中null表示什么都没有，表示一个空对象引用
let obj = null
console.log(typeof null)//object


//声明一个变量，但没有赋值，该变量的值为undefined
let x
console.log("x",x) //undefined
console.log(typeof undefined);//undefined
```

#### ts中的null与undefined

```sh
null代表空，undefined代表未定义
```

##### 特性与配置

```typescript
let str:string
//只给了类型，没有赋值，不允许读取/打印
// console.log(str);

let str1:string|undefined
//允许其为undefined类型后就可以输出了
//输出值为undefined
console.log(str1);//undefined
```

>配置

```sh
配置项中有一个配置 
strict是旗下所有strictXX的总和
如果strictXxx没有设置，就采用strict的设置
 
strictNullChecks
值为 true，不允许将null和undefined赋值给其他类型
值为 false，允许把 null和undefined赋值给其他类型
 
我们采用默认的true，可以减少代码的问题
```

##### 谁可以是null或者undefined

```typescript
// any，unknown，undefined可以接受undefined
let a:any = undefined
let a1:unknown = undefined
let a2:undefined = undefined

//any,unknown,null 可以接受null
let b:any = null
let b1:unknown = null
let b2:null =null
```

##### 变量?:类型

```typescript
/**
 * data?:string
 * ①相当于 data的类型是 string|undefined
 * ② data是个可选参数
 *
 * data?:string 不完全等于 data:string|undefined
 */
function fn(data?:string){

}

//当函数传参为空时，如果 data:string 就会报错
//即使设置 data:string|undefined 也需要传递参数，所以data?:string和data:string|undefined不完全一样
fn()


/*
  小结：
    变量?:类型A
  ①变量的类型为 类型A|undefined，即原类型和undefined的联合类型
  ②变量可选
*/
```

##### 变量!.方法

```typescript
function fn1(data?:string){
    //情况1
    // 由于data可能为undefined，所以会报错
    // data.toLowerCase()

    //2.强制截断
    /**
     * 变量!.方法
     * 
     * 如果变量为undefined、null就省略，或者说不执行
     */
    // data!.toLowerCase()

    //3.进行if判断
    //情况2是这个的简写
    if(data){
        data.toLowerCase()
    }

}
```

### 函数类型

#### 基本语法

```typescript
/*
    function 函数名(参数1:类型,...):返回值类型{

    }

    ①参数个数确定时，调用时参数个数和类型都得一一对应
    ②返回值类型要与实际一致，如果不指明类型，会自动推导
*/
function info(name:string,age:number):number{
    console.log("我好开心");
    return 3
}
```

#### 函数表达式写法

```typescript
/*
    就是从原来的格式中抽离了函数名
*/
let info1 = function (name:string,age:number):number{
    console.log("我好开心");
    return 3
}
```

#### 函数类型的书写

```typescript
/*
    函数类型的写法

    (参数:类型,...)=>返回值类型
*/
let info2:(name:string,age:number)=>number = function  (name:string,age:number):number{
    console.log("我好开心");
    return 3
}

//限定了函数类型后，函数就必须符合类型，同时也可以进行相应简写
let info3:(name:string,age:number)=>number = 
function  (name,age){
    //简写，参数类型和返回值类型不用再显式指出
    console.log("我好开心");
    return 3
}
```

函数类型的写法是未来高阶必备的

```sh
(参数:类型,...)=>返回值类型
```

#### 函数类型抽离

```typescript
//函数类型很长，写在变量后可读性太差，可以用type在外部定义

type InfoFn = (name:string,age:number)=>number

let info4:InfoFn = function  (name,age){
    console.log("我好开心");
    return 3
}
```

#### rest参数

当参数个数不确定时，用来进行预留位置，rest参数是一个数组，回顾js

```javascript
function info(a,b,...arguments){
    //arguments 不确定函数对象
}
```

```typescript
//所谓rest参数就是扩展参数，用于参数不确定的情况
/*
    rest参数的类型必须是数组，原因是他本身会被拓展运算符展开
    ...rest:string[] 新参数都是字符串类型
    ...rest:any      新参数类型任意
*/
function info5(name:string,age:number,...rest:string[]){
    console.log("rest",rest);
}
```





## ts中的接口及应用场景

### 什么是接口

另一种`定义对象类型`的`类型`

>目的

```sh
1.定义一个对象
2.本身也是一种类型
```

>语法

```typescript
interface 接口名 {
    属性名:类型
    属性名:类型
    方法名:返回值类型
}
//方法是一种特殊的键值对，他的完整写法就是对象的一项
```

>使用

```typescript
let 变量:接口名 = {
    //实现接口
    //这个对象必须和接口规定的完全一样
    //属性不能多也不能少，类型也必须一一对应
}
```

>特点

```sh
接口只做定义，不做实现
```

### 接口的应用场景

>一些第三方包或者框架底层源码中有大量的接口类型

>提供方法的对象类型的参数时使用

```typescript
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
```



>为多个同类别的类提供统一的方法和属性声明

```typescript
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
```

### 接口的继承

新的接口只是在原来的接口上增加了一些属性或方法，此时就用接口继承

>语法

```typescript
interface 子接口 extends 父接口{
       //相当于全盘复制父接口并作扩展
 }
```

>举例

```typescript
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
```

### 可索引签名及其他细节

>情况

```sh
有些接口的属性名不确定，个数也不确定

#这个时候就可以使用可索引签名来预留扩展
```

>格式

```typescript
[未知的代号:类型A]:类型B
 //属性的部分 [未知的代号:类型A]
/* 
    通常使用 [x:string]
    x表示未知的代号，实际上啥都行，就是设个未知数
    string表示类型，但是值得注意：
    ①虽然写的是string，但是属性名可以写任意类型，number、symbol、boolean都正确
    ② 如果是其他类型，则属性名必须是相应类型，例如设为[x:number],则属性名必须是number类型
    ③所以都设置为[x:string]方便拓展
*/
  
 // 属性值的部分：
 /* 
 	类型B 必须兼容之前存在的所有类型，
  	例如 下面的Fish接口，则至少要设置为
 	[x:string]: string|number
 */
 
 
 //可索引签名表示扩展的内容必须遵循这个格式

```

>举例

```typescript
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
```

### 拓展：同名接口会合并

>同名接口

```sh
同名接口会进行合并，
相同的属性可以重复声明，但是类型必须和第一次一致(实际上相当于不能声明)
```

>举例

```typescript
//小知识：同名接口会合并
interface Product {
    name:string
    price:number
}

interface Product {
    //同名属性可以声明，但类型必须一致
    //实际上相当于不重复声明
    price:number
    buy():void
}
```

最终相当于

```typescript
interface Product {
    name:string
    price:number
    buy():void
}
```

### 拓展：索引的访问类型

```typescript
//小知识：同名接口会合并
interface Product {
    name:string
    price:number
}

const symId = Symbol("hahah")
interface Product {
    //同名属性可以声明，但类型必须一致
    //实际上相当于不重复声明
    price:number
    buy():void
    [symId]:number | string
}


//通过接口设置索引访问类型
/**
 * ①
 * type 类型A = 接口[属性名的字面量类型]
 * 
 * 则类型A就是 对应属性的类型
 * 
 * ②
 * type 类型B = 接口[属性名1的字面量类型 | 属性名2的字面量类型]
 * 
 * 则类型B是对应多个属性的联合类型
 * 
 * ③
 * 不要误以为 [] 里面是字符串，实际上里面是字面量类型，例如
 * 
 */
type A = Product["name"]

type B = Product["name"|"price"]

//不使用symId的原因，symId是一个值，不是字面量类型
//typeof symId得到 [symId]对应的字面量类型
type C = Product[typeof symId]


/**
 * 需求：获取Product接口中所有属性名组成的类型
 * 方法:
 * keyof 接口名
 * 
 * 作用：
 * 得到所有属性的字面量类型的联合类型
 */

type Pkeys = keyof Product
//keyof Product等同于 "name"|"price"|"buy"|"typeof symId"

//扩展知识，目前了解即可
type AllKeys<T> = T extends any?T:never
// 迭代出来
type Pkeys2 = AllKeys<keyof Product>
export {}
```







